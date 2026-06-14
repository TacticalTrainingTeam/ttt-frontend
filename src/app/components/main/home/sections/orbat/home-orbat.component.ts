import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from 'primeng/button';

@Component({
    selector: 'ttt-home-orbat',
    standalone: true,
    imports: [RouterLink, ButtonDirective],
    templateUrl: './home-orbat.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeOrbatComponent {}
