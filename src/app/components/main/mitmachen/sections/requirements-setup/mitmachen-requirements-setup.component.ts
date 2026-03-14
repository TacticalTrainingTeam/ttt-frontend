import { Component, Input } from '@angular/core';
import { SectionHeaderComponent } from '../../../../../shared/components/section-header/section-header.component';

@Component({
    selector: 'ttt-mitmachen-requirements-setup',
    standalone: true,
    imports: [SectionHeaderComponent],
    templateUrl: './mitmachen-requirements-setup.component.html',
})
export class MitmachenRequirementsSetupComponent {
    @Input({ required: true }) arma3SyncGuideUrl!: string;
    @Input({ required: true }) arma3SyncVideoUrl!: string;
    @Input({ required: true }) arma3SyncTipsUrl!: string;
}
