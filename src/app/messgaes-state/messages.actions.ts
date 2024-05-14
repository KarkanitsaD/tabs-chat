import { Message } from '../models/message.interface';

export class SendMessage {
    static readonly type = '[Messgaes] Send Message';
    constructor(public message: Message) {}
}
