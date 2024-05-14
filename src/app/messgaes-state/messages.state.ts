import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';
import { Message } from '../models/message.interface';
import { SendMessage } from './messages.actions';
import { append } from '@ngxs/store/operators';
import { Injectable } from '@angular/core';

@State<Message[]>({
    name: 'messgaes',
    defaults: [],
})
@Injectable()
export class MessagesState implements NgxsOnInit {
    ngxsOnInit({ setState }: StateContext<Message[]>): void {
        const json = localStorage.getItem('messages');
        if (json) {
            setState(JSON.parse(json) as Message[]);
        }
    }

    @Action(SendMessage)
    onSendMessgae(
        { setState }: StateContext<Message[]>,
        { message }: SendMessage,
    ): void {
        setState(append([message]));
    }
}
