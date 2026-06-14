import { Directive, ElementRef, HostListener, Renderer2, effect, inject, input, output } from '@angular/core';

/**
 * Applies keyboard-activation semantics (Enter/Space) and a11y attributes
 * to non-native interactive elements. Prefer using a <button> where possible.
 */
@Directive({
    selector: '[tttActivable]',
    standalone: true,
})
export class ActivableDirective {
    /** Whether the host is interactive. If false, attributes are removed. */
    tttActivable = input(true);
    /** ARIA role to apply when interactive (defaults to button). */
    activableRole = input('button');
    /** Optional accessible label. If not provided, attribute is omitted. */
    activableAriaLabel = input<string | null>();

    /** Emitted on activation (click, Enter, or Space). */
    activableActivate = output<void>();

    private readonly el = inject(ElementRef<HTMLElement>);
    private readonly renderer = inject(Renderer2);

    constructor() {
        effect(() => {
            const isActivable = this.tttActivable();
            this.renderer.setAttribute(this.el.nativeElement, 'tabindex', isActivable ? '0' : '-1');

            if (isActivable) {
                const role = this.activableRole();
                if (role) {
                    this.renderer.setAttribute(this.el.nativeElement, 'role', role);
                }
                const ariaLabel = this.activableAriaLabel();
                if (ariaLabel) {
                    this.renderer.setAttribute(this.el.nativeElement, 'aria-label', String(ariaLabel));
                } else {
                    this.renderer.removeAttribute(this.el.nativeElement, 'aria-label');
                }
            } else {
                this.renderer.removeAttribute(this.el.nativeElement, 'role');
                this.renderer.removeAttribute(this.el.nativeElement, 'aria-label');
            }
        });
    }

    @HostListener('keydown', ['$event'])
    onKeydown(event: KeyboardEvent): void {
        if (!this.tttActivable()) return;
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.activableActivate.emit();
        }
    }

    @HostListener('click')
    onClick(): void {
        if (!this.tttActivable()) return;
        this.activableActivate.emit();
    }
}
