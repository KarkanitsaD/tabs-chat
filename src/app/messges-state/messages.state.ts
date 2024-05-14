import { Action, State, StateContext } from '@ngxs/store';
import { Message } from '../models/message.interface';
import { AddMessage } from './messages.actions';
import { insertItem } from '@ngxs/store/operators';
import { Injectable } from '@angular/core';

@State<Message[]>({
    name: 'messgaes',
    defaults: [],
})
@Injectable()
export class MessagesState {
    @Action(AddMessage)
    onAddMessgae(
        { setState }: StateContext<Message[]>,
        { message }: AddMessage,
    ): void {
        setState(insertItem(message, 0));
    }
}
