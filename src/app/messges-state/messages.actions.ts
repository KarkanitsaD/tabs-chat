import { Message } from '../models/message.interface';

export class AddMessage {
    static readonly type = '[Messages] Add Message';
    constructor(public message: Message) {}
}

export class UserTyping {
    static readonly type = '[Messages] User Typing';
    constructor(public userId: number) {}
}
