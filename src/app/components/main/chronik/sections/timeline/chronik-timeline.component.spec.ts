import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimelineEvent } from '../../../../../shared/types/chronik.types';
import { ChronikTimelineComponent } from './chronik-timeline.component';

describe('ChronikTimelineComponent', () => {
    let component: ChronikTimelineComponent;
    let fixture: ComponentFixture<ChronikTimelineComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChronikTimelineComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ChronikTimelineComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('timelineEvents', [
            {
                id: 'test',
                title: 'Test Event',
                date: '2020',
                type: 'milestone',
                description: 'desc',
                details: ['detail'],
            } as TimelineEvent,
        ]);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle event details', () => {
        const event = component.timelineEvents()[0];

        component.toggleEventDetails(event);
        expect(component.expandedId()).toBe(event.id);

        component.toggleEventDetails(event);
        expect(component.expandedId()).toBeNull();
    });

    it('should render event content inside the timeline', () => {
        const element: HTMLElement = fixture.nativeElement;
        expect(element.textContent).toContain('Test Event');
        expect(element.textContent).toContain('desc');
    });
});
