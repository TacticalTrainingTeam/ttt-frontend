import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PageHeaderComponent } from '../page-header/page-header.component';

@Component({
    selector: 'ttt-page-layout',
    standalone: true,
    imports: [PageHeaderComponent],
    templateUrl: './page-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLayoutComponent {
    pageTitle = input<string>();
    pageSubtitle = input<string>();
    heroImage = input<string>();
}
