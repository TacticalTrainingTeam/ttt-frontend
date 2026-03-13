import { Component, Input } from '@angular/core';

@Component({
    selector: 'ttt-mitmachen-requirements-setup',
    standalone: true,
    templateUrl: './mitmachen-requirements-setup.component.html',
    styleUrl: './mitmachen-requirements-setup.component.css',
})
export class MitmachenRequirementsSetupComponent {
    @Input({ required: true }) arma3SyncGuideUrl!: string;
    @Input({ required: true }) arma3SyncVideoUrl!: string;
    @Input({ required: true }) arma3SyncTipsUrl!: string;
}
