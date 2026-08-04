import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ButtonDirective } from '@openng/optimus-ui/button';
import { SectionHeaderComponent } from '../../../../../shared/components/section-header/section-header.component';

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
}
