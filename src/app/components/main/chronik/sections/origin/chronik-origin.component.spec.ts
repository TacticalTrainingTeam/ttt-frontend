import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChronikOriginComponent } from './chronik-origin.component';

describe('ChronikOriginComponent', () => {
    let component: ChronikOriginComponent;
    let fixture: ComponentFixture<ChronikOriginComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChronikOriginComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ChronikOriginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
