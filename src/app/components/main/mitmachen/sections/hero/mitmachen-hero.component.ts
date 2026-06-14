import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'ttt-mitmachen-hero',
    standalone: true,
    templateUrl: './mitmachen-hero.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MitmachenHeroComponent {
    pageSubtitle = input.required<string>();
    eventSchedule = input.required<string>();
}
