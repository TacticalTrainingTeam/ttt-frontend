import { Component, Input } from '@angular/core';

@Component({
    selector: 'ttt-mitmachen-entry-cta',
    standalone: true,
    templateUrl: './mitmachen-entry-cta.component.html',
    styleUrl: './mitmachen-entry-cta.component.css',
})
export class MitmachenEntryCtaComponent {
    @Input({ required: true }) eventsUrl!: string;
    @Input({ required: true }) discordUrl!: string;
}
