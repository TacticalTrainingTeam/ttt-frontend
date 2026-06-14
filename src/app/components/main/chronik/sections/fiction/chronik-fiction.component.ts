import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'ttt-chronik-fiction',
    standalone: true,
    templateUrl: './chronik-fiction.component.html',
    styleUrl: './chronik-fiction.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChronikFictionComponent {
    fictionDocumentationLink = input.required<string>();
}
