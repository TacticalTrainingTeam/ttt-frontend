import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'ttt-medien-corporate-cta',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './medien-corporate-cta.component.html',
    styleUrl: './medien-corporate-cta.component.css',
})
export class MedienCorporateCtaComponent {
    @Input({ required: true }) wikiUrl!: string;
}
