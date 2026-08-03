import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SectionHeaderComponent } from '../../../../../shared/components/section-header/section-header.component';

@Component({
    selector: 'ttt-chronik-fiction',
    standalone: true,
    imports: [SectionHeaderComponent],
    styleUrl: './chronik-fiction.component.css',
    templateUrl: './chronik-fiction.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChronikFictionComponent {
    fictionDocumentationLink = input.required<string>();
}
