import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ChronikComponent } from './chronik.component';
import { TTT_LINKS } from '../../../shared/constants/external-links';

describe('ChronikComponent', () => {
    let component: ChronikComponent;
    let fixture: ComponentFixture<ChronikComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChronikComponent],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(ChronikComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have timeline events defined', () => {
        expect(component.timelineEvents).toBeDefined();
        expect(Array.isArray(component.timelineEvents)).toBe(true);
    });

    it('should expose documentation link from the shared registry', () => {
        expect(component.fictionDocumentationLink).toBe(TTT_LINKS.fictionDocumentation);
    });
});
