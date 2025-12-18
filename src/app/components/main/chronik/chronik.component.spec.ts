import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChronikComponent } from './chronik.component';

describe('ChronikComponent', () => {
    let component: ChronikComponent;
    let fixture: ComponentFixture<ChronikComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChronikComponent],
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

    it('should have event type configuration methods', () => {
        expect(component.getEventTypeColor).toBeDefined();
        expect(component.getEventTypeLabel).toBeDefined();
        expect(component.getEventIconClasses).toBeDefined();
    });

    it('should return correct event type styling', () => {
        const anniversaryColor = component.getEventTypeColor('anniversary');
        const milestoneColor = component.getEventTypeColor('milestone');

        expect(anniversaryColor).toContain('border-tttRed');
        expect(milestoneColor).toContain('border-blue-500');
    });
});
