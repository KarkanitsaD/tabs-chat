import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';
import { Message } from '../models/message.interface';
import {
    AddMessage,
    SendMessage,
    SendTypingNotification,
} from './messages.actions';
import { append, insertItem } from '@ngxs/store/operators';
import { Injectable } from '@angular/core';
import { BroadcastService } from '../services/broadcast.service';

@State<Message[]>({
    name: 'messgaes',
    defaults: [],
})
@Injectable()
export class MessagesState {
    constructor(private broadcastService: BroadcastService) {}

    @Action(SendMessage)
    onSendMessgae(
        { setState }: StateContext<Message[]>,
        { message }: SendMessage,
    ): void {
        setState(insertItem(message, 0));
        this.broadcastService.sendMessage(message);
    }

    @Action(AddMessage)
    onAddMessgae(
        { setState }: StateContext<Message[]>,
        { message }: AddMessage,
    ): void {
        setState(insertItem(message, 0));
    }

    @Action(SendTypingNotification)
    onSendTypingNotification(
        _: StateContext<Message[]>,
        { userId }: SendTypingNotification,
    ): void {
        this.broadcastService.sendTypingNotofocation(userId);
    }
}
