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
        component.timelineEvents = [
            {
                id: 'test',
                title: 'Test Event',
                date: '2020',
                type: 'milestone',
                color: 'border-blue-500 bg-blue-500/20 text-blue-300',
                description: 'desc',
                details: ['detail'],
                expanded: false,
            } as TimelineEvent,
        ];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle event details', () => {
        component.toggleEventDetails(component.timelineEvents[0]);
        expect(component.timelineEvents[0].expanded).toBeTrue();
    });
});
