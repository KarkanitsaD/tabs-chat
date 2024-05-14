import { Message } from '../models/message.interface';

export class SendMessage {
    static readonly type = '[Messgaes] Send Message';
    constructor(public message: Message) {}
}

export class AddMessage {
    static readonly type = '[Messages] Add Message';
    constructor(public message: Message) {}
}
