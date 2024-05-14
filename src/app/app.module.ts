import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxsModule } from '@ngxs/store';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { MessagesState } from './messges-state/messages.state';
import { BroadcastService } from './services/broadcast.service';
import { UserInfoComponent } from './components/user-info/user-info.component';

@NgModule({
    declarations: [AppComponent, ChatComponent, UserInfoComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        NgxsModule.forRoot([MessagesState]),
        ReactiveFormsModule,
    ],
    providers: [provideAnimationsAsync(), BroadcastService],
    bootstrap: [AppComponent],
})
export class AppModule {}
