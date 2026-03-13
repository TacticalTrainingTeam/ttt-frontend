import { Component, Input } from '@angular/core';

@Component({
    selector: 'ttt-mitmachen-hero',
    standalone: true,
    templateUrl: './mitmachen-hero.component.html',
    styleUrl: './mitmachen-hero.component.css',
})
export class MitmachenHeroComponent {
    @Input({ required: true }) pageSubtitle!: string;
    @Input({ required: true }) eventSchedule!: string;
}
