import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'ttt-section-header',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './section-header.component.html',
})
export class SectionHeaderComponent {
    @Input({ required: true }) title!: string;
    @Input() subtitle?: string;

    @Input() containerClass = 'ttt-text-center mb-6';
    @Input() titleClass = 'ttt-section-title mb-2 flex items-center justify-center gap-3';
    @Input() subtitleClass = 'ttt-description-text';
}
