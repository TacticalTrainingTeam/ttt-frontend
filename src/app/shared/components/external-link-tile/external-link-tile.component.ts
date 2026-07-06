import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'ttt-external-link-tile',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './external-link-tile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExternalLinkTileComponent {
    href = input.required<string>();
    title = input.required<string>();
    description = input.required<string>();
    iconClass = input.required<string>();
    displayUrl = input<string>();
    ariaLabel = input<string>();
    cardClass = input('ttt-content-card ttt-card-interactive group block text-left');
    iconWrapperClass = input('ttt-icon-tile');
}
