import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SectionHeaderComponent } from '../../../../../shared/components/section-header/section-header.component';
import { ExternalLinkTileComponent } from '../../../../../shared/components/external-link-tile/external-link-tile.component';

@Component({
    selector: 'ttt-mitmachen-requirements-setup',
    standalone: true,
    imports: [SectionHeaderComponent, ExternalLinkTileComponent],
    templateUrl: './mitmachen-requirements-setup.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MitmachenRequirementsSetupComponent {
    arma3SyncGuideUrl = input.required<string>();
    arma3SyncVideoUrl = input.required<string>();
    arma3SyncTipsUrl = input.required<string>();
}
