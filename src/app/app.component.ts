import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BroadcastService } from './services/broadcast.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    constructor(private broadcastService: BroadcastService) {}
}
