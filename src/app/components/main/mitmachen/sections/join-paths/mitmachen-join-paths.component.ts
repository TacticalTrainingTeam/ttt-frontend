import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { SectionHeaderComponent } from '../../../../../shared/components/section-header/section-header.component';

@Component({
    selector: 'ttt-mitmachen-join-paths',
    standalone: true,
    imports: [ButtonDirective, SectionHeaderComponent],
    templateUrl: './mitmachen-join-paths.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MitmachenJoinPathsComponent {
    discordUrl = input.required<string>();
}
