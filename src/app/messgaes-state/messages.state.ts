import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';
import { Message } from '../models/message.interface';
import { AddMessage, SendMessage } from './messages.actions';
import { append } from '@ngxs/store/operators';
import { Injectable } from '@angular/core';
import { BroadcastService } from '../services/broadcast.service';

@State<Message[]>({
    name: 'messgaes',
    defaults: [],
})
@Injectable()
export class MessagesState implements NgxsOnInit {
    constructor(private broadcastService: BroadcastService) {}

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
        this.broadcastService.sendMessage(message);
    }

    @Action(AddMessage)
    onAddMessgae(
        { setState }: StateContext<Message[]>,
        { message }: AddMessage,
    ): void {
        setState(append([message]));
    }
}
