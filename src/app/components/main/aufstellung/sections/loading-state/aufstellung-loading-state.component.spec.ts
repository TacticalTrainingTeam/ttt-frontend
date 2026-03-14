import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AufstellungLoadingStateComponent } from './aufstellung-loading-state.component';

describe('AufstellungLoadingStateComponent', () => {
    let component: AufstellungLoadingStateComponent;
    let fixture: ComponentFixture<AufstellungLoadingStateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AufstellungLoadingStateComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AufstellungLoadingStateComponent);
        component = fixture.componentInstance;
        component.loadingMessages = {
            LOADING: 'Loading...',
            ERROR_TITLE: 'Error',
            RETRY_TEXT: 'Retry',
            RETRY_ARIA: 'Retry loading data',
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
