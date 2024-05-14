import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-chat',
    templateUrl: 'chat.component.html',
    styleUrl: './chat.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {}
