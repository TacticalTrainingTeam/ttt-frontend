import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightSidebarComponent } from './right-sidebar.component';

describe('RightSidebarComponent', () => {
    let component: RightSidebarComponent;
    let fixture: ComponentFixture<RightSidebarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RightSidebarComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(RightSidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display Discord widget', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('aside')).toBeTruthy();
        expect(compiled.textContent).toContain('Live Discord');
    });

    it('should include Discord widget and fallback link', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const iframe = compiled.querySelector('iframe');
        const fallbackLink = compiled.querySelector('a[href="https://discord.tacticalteam.de"]');

        expect(iframe).toBeTruthy();
        expect(iframe?.getAttribute('src')).toContain('discord.com/widget');
        expect(fallbackLink).toBeTruthy();
    });
});
