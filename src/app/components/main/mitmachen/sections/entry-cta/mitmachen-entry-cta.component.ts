import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ButtonDirective } from '@openng/optimus-ui/button';
import { SectionHeaderComponent } from '../../../../../shared/components/section-header/section-header.component';
import { TTT_COMMUNITY_STATS } from '../../../../../shared/constants/community-stats';

@Component({
    selector: 'ttt-mitmachen-entry-cta',
    standalone: true,
    imports: [ButtonDirective, SectionHeaderComponent],
    templateUrl: './mitmachen-entry-cta.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MitmachenEntryCtaComponent {
    eventsUrl = input.required<string>();
    discordUrl = input.required<string>();

    readonly entrySteps = ['Discord beitreten', 'Setup einrichten', 'Einsteiger-Event', "Los geht's"];
    readonly communityStats = TTT_COMMUNITY_STATS;
}
