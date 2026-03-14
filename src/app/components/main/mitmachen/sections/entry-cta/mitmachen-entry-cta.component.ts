import { Component, Input } from '@angular/core';
import { SectionHeaderComponent } from '../../../../../shared/components/section-header/section-header.component';

@Component({
    selector: 'ttt-mitmachen-entry-cta',
    standalone: true,
    imports: [SectionHeaderComponent],
    templateUrl: './mitmachen-entry-cta.component.html',
})
export class MitmachenEntryCtaComponent {
    @Input({ required: true }) eventsUrl!: string;
    @Input({ required: true }) discordUrl!: string;
}
