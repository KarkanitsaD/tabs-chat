import { Message } from '../models/message.interface';

export class SendMessage {
    static readonly type = '[Messgaes] Send Message';
    constructor(public message: Message) {}
}

export class AddMessage {
    static readonly type = '[Messages] Add Message';
    constructor(public message: Message) {}
}

export class SendTypingNotification {
    static readonly type = '[Messages] Send Typing Notification';
    constructor(public userId: number) {}
}

export class UserTyping {
    static readonly type = '[Messages] User Typing';
    constructor(public userId: number) {}
}
