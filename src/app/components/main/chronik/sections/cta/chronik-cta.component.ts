import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from 'primeng/button';

@Component({
    selector: 'ttt-chronik-cta',
    standalone: true,
    imports: [RouterLink, ButtonDirective],
    templateUrl: './chronik-cta.component.html',
    styleUrl: './chronik-cta.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChronikCtaComponent {}
