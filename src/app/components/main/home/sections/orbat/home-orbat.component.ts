import { ChangeDetectionStrategy, Component } from '@angular/core';
// Temporaer deaktiviert bis die Member-API live ist
// import { RouterLink } from '@angular/router';
// import { ButtonDirective } from '@openng/optimus-ui/button';

@Component({
    selector: 'ttt-home-orbat',
    standalone: true,
    // imports: [RouterLink, ButtonDirective],
    templateUrl: './home-orbat.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeOrbatComponent {}
