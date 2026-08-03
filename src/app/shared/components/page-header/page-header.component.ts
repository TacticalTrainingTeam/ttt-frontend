import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
    selector: 'ttt-page-header',
    standalone: true,
    templateUrl: './page-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent {
    pageTitle = input.required<string>();
    pageSubtitle = input<string>();
    heroImage = input<string>();

    protected readonly boxClass = computed(() =>
        this.heroImage() ? 'ttt-page-container relative -mt-8 md:-mt-12' : 'ttt-page-container pt-12'
    );
}
