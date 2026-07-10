import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MitmachenComponent } from './mitmachen.component';
import { TTT_LINKS } from '../../../shared/constants/external-links';

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

    it('should expose the shared link registry', () => {
        expect(component.externalLinks).toBe(TTT_LINKS);
        expect(component.externalLinks.discord).toContain('discord.tacticalteam.de');
        expect(component.externalLinks.wikiArma3Sync).toContain('wiki.tacticalteam.de');
    });
});
