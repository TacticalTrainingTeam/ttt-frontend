import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeFeaturesJoinComponent } from './home-features-join.component';

describe('HomeFeaturesJoinComponent', () => {
    let component: HomeFeaturesJoinComponent;
    let fixture: ComponentFixture<HomeFeaturesJoinComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HomeFeaturesJoinComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HomeFeaturesJoinComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
