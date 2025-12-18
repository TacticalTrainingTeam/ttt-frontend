import { Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, Renderer2, inject } from '@angular/core';

/**
 * Applies keyboard-activation semantics (Enter/Space) and a11y attributes
 * to non-native interactive elements. Prefer using a <button> where possible.
 */
@Directive({
    selector: '[tttActivable]',
    standalone: true,
})
export class ActivableDirective implements OnChanges {
    /** Whether the host is interactive. If false, attributes are removed. */
    @Input() tttActivable = true;
    /** ARIA role to apply when interactive (defaults to button). */
    @Input() activableRole = 'button';
    /** Optional accessible label. If not provided, attribute is omitted. */
    @Input() activableAriaLabel?: string | null;

    /** Emitted on activation (click, Enter, or Space). */
    @Output() activableActivate = new EventEmitter<void>();

    private el = inject(ElementRef<HTMLElement>);
    private renderer = inject(Renderer2);

    ngOnChanges(): void {
        // tabindex
        this.renderer.setAttribute(this.el.nativeElement, 'tabindex', this.tttActivable ? '0' : '-1');

        if (this.tttActivable) {
            // role
            if (this.activableRole) {
                this.renderer.setAttribute(this.el.nativeElement, 'role', this.activableRole);
            }
            // aria-label
            if (this.activableAriaLabel) {
                this.renderer.setAttribute(this.el.nativeElement, 'aria-label', String(this.activableAriaLabel));
            } else {
                this.renderer.removeAttribute(this.el.nativeElement, 'aria-label');
            }
        } else {
            this.renderer.removeAttribute(this.el.nativeElement, 'role');
            this.renderer.removeAttribute(this.el.nativeElement, 'aria-label');
        }
    }

    @HostListener('keydown', ['$event'])
    onKeydown(event: KeyboardEvent): void {
        if (!this.tttActivable) return;
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.activableActivate.emit();
        }
    }

    @HostListener('click')
    onClick(): void {
        if (!this.tttActivable) return;
        this.activableActivate.emit();
    }
}
