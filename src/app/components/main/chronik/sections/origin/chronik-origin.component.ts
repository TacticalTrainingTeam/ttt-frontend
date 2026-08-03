import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionHeaderComponent } from '../../../../../shared/components/section-header/section-header.component';

@Component({
    selector: 'ttt-chronik-origin',
    standalone: true,
    imports: [SectionHeaderComponent],
    styleUrl: './chronik-origin.component.css',
    templateUrl: './chronik-origin.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChronikOriginComponent {}
