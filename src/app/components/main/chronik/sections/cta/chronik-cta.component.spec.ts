import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ChronikCtaComponent } from './chronik-cta.component';

describe('ChronikCtaComponent', () => {
    let component: ChronikCtaComponent;
    let fixture: ComponentFixture<ChronikCtaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChronikCtaComponent],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(ChronikCtaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
