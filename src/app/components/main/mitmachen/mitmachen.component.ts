import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { MitmachenJoinPathsComponent } from './sections/join-paths/mitmachen-join-paths.component';
import { MitmachenRequirementsSetupComponent } from './sections/requirements-setup/mitmachen-requirements-setup.component';
import { MitmachenEntryCtaComponent } from './sections/entry-cta/mitmachen-entry-cta.component';
import { TTT_LINKS } from '../../../shared/constants/external-links';

@Component({
    selector: 'ttt-mitmachen',
    standalone: true,
    imports: [PageHeaderComponent, MitmachenJoinPathsComponent, MitmachenRequirementsSetupComponent, MitmachenEntryCtaComponent],
    templateUrl: './mitmachen.component.html',
    styleUrl: './mitmachen.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MitmachenComponent {
    readonly pageTitle = 'Mitmachen beim TTT';
    readonly heroImage = '/img/banner/banner-img7.webp';
    readonly pageSubtitle =
        'Wir veranstalten regelmäßig Events für Arma 3 und Arma Reforger – dienstags und freitags von 19:30 bis 23:30 Uhr. Mitmachen kann jeder, egal ob Rekrut oder Gast.';

    readonly externalLinks = TTT_LINKS;
}
