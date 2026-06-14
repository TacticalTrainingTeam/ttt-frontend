import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'ttt-chronik-origin',
    standalone: true,
    templateUrl: './chronik-origin.component.html',
    styleUrl: './chronik-origin.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChronikOriginComponent {}
