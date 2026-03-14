import { Component, Input } from '@angular/core';
import { SectionHeaderComponent } from '../../../../../shared/components/section-header/section-header.component';

@Component({
    selector: 'ttt-mitmachen-join-paths',
    standalone: true,
    imports: [SectionHeaderComponent],
    templateUrl: './mitmachen-join-paths.component.html',
})
export class MitmachenJoinPathsComponent {
    @Input({ required: true }) discordUrl!: string;
}
