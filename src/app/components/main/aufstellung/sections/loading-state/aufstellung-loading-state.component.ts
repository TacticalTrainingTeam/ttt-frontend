import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AufstellungLoadingMessages } from '../../../../../shared/types/aufstellung.types';

@Component({
    selector: 'ttt-aufstellung-loading-state',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './aufstellung-loading-state.component.html',
    styleUrl: './aufstellung-loading-state.component.css',
})
export class AufstellungLoadingStateComponent {
    @Input({ required: true }) isLoading = false;
    @Input() loadingError: string | null = null;
    @Input({ required: true }) loadingMessages!: AufstellungLoadingMessages;
    @Output() readonly retry = new EventEmitter<void>();

    onRetry(): void {
        this.retry.emit();
    }
}
