import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScrollTop } from 'primeng/scrolltop';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LeftSidebarComponent } from './components/sidebar/left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './components/sidebar/right-sidebar/right-sidebar.component';

@Component({
    selector: 'ttt-root',
    standalone: true,
    imports: [RouterOutlet, ScrollTop, HeaderComponent, FooterComponent, LeftSidebarComponent, RightSidebarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
