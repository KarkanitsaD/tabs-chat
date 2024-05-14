import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { Observable, Subscription, debounceTime, tap } from 'rxjs';
import { Message } from '../../models/message.interface';
import { MessagesState } from '../../messges-state/messages.state';
import { FormControl } from '@angular/forms';
import { AddMessage, UserTyping } from '../../messges-state/messages.actions';
import { BroadcastService } from '../../services/broadcast.service';

@Component({
    selector: 'app-chat',
    templateUrl: 'chat.component.html',
    styleUrl: './chat.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit, OnDestroy {
    @Input() userId = 0;

    messages$: Observable<Message[]> = this.store.select(MessagesState);

    messageControl = new FormControl<string>('');

    typingUserId = 0;

    private subscriptions: Subscription[] = [];

    constructor(
        private store: Store,
        private actions$: Actions,
        private cdr: ChangeDetectorRef,
        private broadcastService: BroadcastService,
    ) {}

    ngOnInit(): void {
        this.subscriptions.push(
            this.messageChangesSubscription(),
            this.userTypingSubscription(),
        );
    }

    ngOnDestroy(): void {
        this.broadcastService.closeChannels();

        for (let i = 0; i < this.subscriptions.length; i++) {
            this.subscriptions[i].unsubscribe();
        }
    }

    onSend(): void {
        const content = this.messageControl.value;
        if (content) {
            const message: Message = { userId: this.userId, content };
            this.store.dispatch(new AddMessage(message));
            this.broadcastService.sendMessage(message);
            this.messageControl.setValue('', { emitEvent: false });
        }
    }

    private messageChangesSubscription(): Subscription {
        return this.messageControl.valueChanges.subscribe(() =>
            this.broadcastService.sendTypingNotification(this.userId),
        );
    }

    private userTypingSubscription(): Subscription {
        return this.actions$
            .pipe(
                ofActionSuccessful(UserTyping),
                tap(action => {
                    if (this.typingUserId !== action.userId) {
                        this.typingUserId = action.userId;
                        this.cdr.detectChanges();
                    }
                }),
                debounceTime(500),
            )
            .subscribe(() => {
                this.typingUserId = 0;
                this.cdr.detectChanges();
            });
    }
}
