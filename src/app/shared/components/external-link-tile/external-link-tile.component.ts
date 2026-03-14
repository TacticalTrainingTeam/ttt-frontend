import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'ttt-external-link-tile',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './external-link-tile.component.html',
})
export class ExternalLinkTileComponent {
    @Input({ required: true }) href!: string;
    @Input({ required: true }) title!: string;
    @Input({ required: true }) description!: string;
    @Input({ required: true }) iconClass!: string;
    @Input() displayUrl?: string;
    @Input() ariaLabel?: string;
    @Input() cardClass = 'ttt-content-card group block text-left transition-transform duration-300 hover:scale-105';
    @Input() iconWrapperClass = 'bg-tttGray-700/50 flex h-12 w-12 items-center justify-center rounded-lg';
}
