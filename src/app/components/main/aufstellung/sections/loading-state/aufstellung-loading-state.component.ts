import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { Message } from 'primeng/message';
import { ProgressSpinner } from 'primeng/progressspinner';
import { AufstellungLoadingMessages } from '../../../../../shared/types/aufstellung.types';

@Component({
    selector: 'ttt-aufstellung-loading-state',
    standalone: true,
    imports: [ButtonDirective, Message, ProgressSpinner],
    templateUrl: './aufstellung-loading-state.component.html',
    styleUrl: './aufstellung-loading-state.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AufstellungLoadingStateComponent {
    isLoading = input.required<boolean>();
    loadingError = input<string | null>(null);
    loadingMessages = input.required<AufstellungLoadingMessages>();
    readonly retry = output<void>();

    onRetry(): void {
        this.retry.emit();
    }
}
