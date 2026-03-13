import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MitmachenComponent } from './mitmachen.component';

describe('MitmachenComponent', () => {
    let component: MitmachenComponent;
    let fixture: ComponentFixture<MitmachenComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MitmachenComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MitmachenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should expose external links', () => {
        expect(component.externalLinks.discord).toBe('https://discord.tacticalteam.de');
        expect(component.externalLinks.events).toBe('https://events.tacticalteam.de/events/');
        expect(component.externalLinks.arma3SyncGuide).toContain('wiki.tacticalteam.de');
    });
});
