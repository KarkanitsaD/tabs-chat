import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { Observable, debounceTime, tap } from 'rxjs';
import { Message } from '../../models/message.interface';
import { MessagesState } from '../../messgaes-state/messages.state';
import { FormControl } from '@angular/forms';
import {
    SendMessage,
    SendTypingNotification,
    UserTyping,
} from '../../messgaes-state/messages.actions';
import { UserHelper } from '../../helpers/user.helper';

@Component({
    selector: 'app-chat',
    templateUrl: 'chat.component.html',
    styleUrl: './chat.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit {
    messages$: Observable<Message[]> = this.store.select(MessagesState);

    messageControl = new FormControl<string>('');

    typingUserId = 0;

    private userId = UserHelper.getUserId();

    constructor(
        private store: Store,
        private actions$: Actions,
        private cdr: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this.messageChangesSubscription();
        this.userTypingSubscription();
    }

    onSend(): void {
        const content = this.messageControl.value;
        if (content) {
            this.store.dispatch(
                new SendMessage({ userId: this.userId, content }),
            );
            this.messageControl.setValue('', { emitEvent: false });
        }
    }

    private messageChangesSubscription(): void {
        this.messageControl.valueChanges.subscribe(() =>
            this.store.dispatch(new SendTypingNotification(this.userId)),
        );
    }

    private userTypingSubscription(): void {
        this.actions$
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
            .subscribe(v => {
                this.typingUserId = 0;
                this.cdr.detectChanges();
            });
    }
}
