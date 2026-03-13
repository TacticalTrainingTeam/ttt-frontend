import { Component, Input } from '@angular/core';

@Component({
    selector: 'ttt-chronik-fiction',
    standalone: true,
    templateUrl: './chronik-fiction.component.html',
    styleUrl: './chronik-fiction.component.css',
})
export class ChronikFictionComponent {
    @Input({ required: true }) fictionDocumentationLink!: string;
}
