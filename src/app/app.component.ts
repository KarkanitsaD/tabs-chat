import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserHelper } from './helpers/user.helper';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    userId = UserHelper.getUserId();
}
