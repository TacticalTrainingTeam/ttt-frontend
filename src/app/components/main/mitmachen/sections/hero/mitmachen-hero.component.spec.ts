import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MitmachenHeroComponent } from './mitmachen-hero.component';

describe('MitmachenHeroComponent', () => {
    let component: MitmachenHeroComponent;
    let fixture: ComponentFixture<MitmachenHeroComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MitmachenHeroComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MitmachenHeroComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('pageSubtitle', 'test');
        fixture.componentRef.setInput('eventSchedule', 'test');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
