import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeOrbatComponent } from './home-orbat.component';

describe('HomeOrbatComponent', () => {
    let component: HomeOrbatComponent;
    let fixture: ComponentFixture<HomeOrbatComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HomeOrbatComponent],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(HomeOrbatComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
