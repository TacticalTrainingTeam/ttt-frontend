import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from '@openng/optimus-ui/button';
import { TTT_LINKS } from '../../../../../shared/constants/external-links';

@Component({
    selector: 'ttt-chronik-cta',
    standalone: true,
    imports: [RouterLink, ButtonDirective],
    templateUrl: './chronik-cta.component.html',
    styleUrl: './chronik-cta.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChronikCtaComponent {
    readonly discordUrl = TTT_LINKS.discord;
}
