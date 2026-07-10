import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MitmachenHeroComponent } from './sections/hero/mitmachen-hero.component';
import { MitmachenJoinPathsComponent } from './sections/join-paths/mitmachen-join-paths.component';
import { MitmachenRequirementsSetupComponent } from './sections/requirements-setup/mitmachen-requirements-setup.component';
import { MitmachenEntryCtaComponent } from './sections/entry-cta/mitmachen-entry-cta.component';
import { TTT_LINKS } from '../../../shared/constants/external-links';

@Component({
    selector: 'ttt-mitmachen',
    standalone: true,
    imports: [
        CommonModule,
        MitmachenHeroComponent,
        MitmachenJoinPathsComponent,
        MitmachenRequirementsSetupComponent,
        MitmachenEntryCtaComponent,
    ],
    templateUrl: './mitmachen.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MitmachenComponent {
    readonly pageSubtitle =
        'Wir veranstalten regelmäßig Events für Arma 3 und Arma Reforger – von Training über Missionen bis zu taktischen Gefechten ist alles dabei.';
    readonly eventSchedule = 'dienstags und freitags von 19:30 bis 23:30 Uhr';

    readonly externalLinks = TTT_LINKS;
}
