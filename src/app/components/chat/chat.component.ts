import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Message } from '../../models/message.interface';
import { MessagesState } from '../../messgaes-state/messages.state';
import { FormControl } from '@angular/forms';
import { SendMessage } from '../../messgaes-state/messages.actions';

@Component({
    selector: 'app-chat',
    templateUrl: 'chat.component.html',
    styleUrl: './chat.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {
    messages$: Observable<Message[]> = this.store.select(MessagesState);

    messageControl = new FormControl<string>('');

    constructor(private store: Store) {}

    onSend(): void {
        const content = this.messageControl.value;
        if (content) {
            this.store.dispatch(new SendMessage({ userId: 1, content }));
            this.messageControl.setValue('');
        }
    }
}
