import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'ttt-section-header',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './section-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeaderComponent {
    title = input.required<string>();
    subtitle = input<string>();

    containerClass = input('ttt-text-center mb-6');
    titleClass = input('ttt-section-title mb-2 flex items-center justify-center gap-3');
    subtitleClass = input('ttt-description-text');
    showDivider = input(false);
}
