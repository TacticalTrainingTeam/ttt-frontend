import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TTT_LINKS, TTT_SOCIAL_LINKS } from '../../shared/constants/external-links';

@Component({
    selector: 'ttt-footer',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './footer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
    readonly currentYear = new Date().getFullYear();
    readonly links = TTT_LINKS;
    readonly socialLinks = TTT_SOCIAL_LINKS;
}
