import { Injectable } from '@angular/core';
import { Message } from '../models/message.interface';
import { Store } from '@ngxs/store';
import { AddMessage, UserTyping } from '../messgaes-state/messages.actions';

@Injectable()
export class BroadcastService {
    messagesChannel = new BroadcastChannel('messages');

    typingChannel = new BroadcastChannel('typing');

    constructor(private store: Store) {
        this.messagesChannel.onmessage = this.messageHandler;
        this.typingChannel.onmessage = this.typingHandler;
    }

    sendMessage(message: Message): void {
        this.messagesChannel.postMessage(message);
    }

    sendTypingNotofocation(userId: number): void {
        this.typingChannel.postMessage(userId);
    }

    private messageHandler = (message: any) => {
        this.store.dispatch(new AddMessage(message.data as Message));
    };

    private typingHandler = (message: any) => {
        this.store.dispatch(new UserTyping(message.data));
    };
}
