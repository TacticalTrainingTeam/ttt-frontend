import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'ttt-page-layout',
    standalone: true,
    imports: [],
    templateUrl: './page-layout.component.html',
    styleUrl: './page-layout.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLayoutComponent {
    pageTitle = input<string>();
    pageSubtitle = input<string>();
}
