import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from 'primeng/button';
import { SectionHeaderComponent } from '../../../../../shared/components/section-header/section-header.component';
import { ExternalLinkTileComponent } from '../../../../../shared/components/external-link-tile/external-link-tile.component';

@Component({
    selector: 'ttt-medien-corporate-cta',
    standalone: true,
    imports: [RouterLink, ButtonDirective, SectionHeaderComponent, ExternalLinkTileComponent],
    templateUrl: './medien-corporate-cta.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedienCorporateCtaComponent {
    wikiUrl = input.required<string>();
}
