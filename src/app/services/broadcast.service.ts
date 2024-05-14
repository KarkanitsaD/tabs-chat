import { Injectable } from '@angular/core';
import { Message } from '../models/message.interface';
import { Store } from '@ngxs/store';
import { AddMessage } from '../messgaes-state/messages.actions';

@Injectable()
export class BroadcastService {
    messagesChannel = new BroadcastChannel('messages');

    constructor(private store: Store) {
        this.messagesChannel.onmessage = this.messageHandler;
    }

    sendMessage(message: Message): void {
        this.messagesChannel.postMessage(message);
    }

    private messageHandler = (message: any) => {
        this.store.dispatch(new AddMessage(message.data as Message));
    };
}
