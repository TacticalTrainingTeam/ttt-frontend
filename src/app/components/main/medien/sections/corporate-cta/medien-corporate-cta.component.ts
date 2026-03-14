import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from '../../../../../shared/components/section-header/section-header.component';
import { ExternalLinkTileComponent } from '../../../../../shared/components/external-link-tile/external-link-tile.component';

@Component({
    selector: 'ttt-medien-corporate-cta',
    standalone: true,
    imports: [RouterLink, SectionHeaderComponent, ExternalLinkTileComponent],
    templateUrl: './medien-corporate-cta.component.html',
})
export class MedienCorporateCtaComponent {
    @Input({ required: true }) wikiUrl!: string;
}
