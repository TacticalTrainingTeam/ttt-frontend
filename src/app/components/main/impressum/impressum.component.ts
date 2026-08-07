import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';

@Component({
    selector: 'ttt-impressum',
    standalone: true,
    imports: [PageLayoutComponent],
    templateUrl: './impressum.component.html',
    styleUrl: './impressum.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImpressumComponent {
    readonly pageTitle = 'Impressum';
}
