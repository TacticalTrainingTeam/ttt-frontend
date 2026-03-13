import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeFeaturesJoinComponent } from './home-features-join.component';

describe('HomeFeaturesJoinComponent', () => {
    let component: HomeFeaturesJoinComponent;
    let fixture: ComponentFixture<HomeFeaturesJoinComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HomeFeaturesJoinComponent],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(HomeFeaturesJoinComponent);
        component = fixture.componentInstance;
        component.communityStats = [
            { value: '80+', label: 'Mitglieder', color: 'text-tttGreen' },
            { value: '2013', label: 'Gegründet', color: 'text-tttGreen' },
            { value: '2', label: 'Events/Woche', color: 'text-tttGreen' },
        ];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
