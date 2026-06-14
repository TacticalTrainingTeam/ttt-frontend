import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MitmachenEntryCtaComponent } from './mitmachen-entry-cta.component';

describe('MitmachenEntryCtaComponent', () => {
    let component: MitmachenEntryCtaComponent;
    let fixture: ComponentFixture<MitmachenEntryCtaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MitmachenEntryCtaComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MitmachenEntryCtaComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('eventsUrl', 'https://events.tacticalteam.de/events/');
        fixture.componentRef.setInput('discordUrl', 'https://discord.tacticalteam.de');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
