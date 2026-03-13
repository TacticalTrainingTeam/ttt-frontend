import { Component, Input } from '@angular/core';

@Component({
    selector: 'ttt-mitmachen-join-paths',
    standalone: true,
    templateUrl: './mitmachen-join-paths.component.html',
    styleUrl: './mitmachen-join-paths.component.css',
})
export class MitmachenJoinPathsComponent {
    @Input({ required: true }) discordUrl!: string;
}
