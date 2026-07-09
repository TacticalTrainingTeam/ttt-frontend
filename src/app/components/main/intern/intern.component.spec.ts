import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { InternComponent } from './intern.component';

describe('InternComponent', () => {
    let component: InternComponent;
    let fixture: ComponentFixture<InternComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InternComponent],
            providers: [provideRouter([]), provideHttpClient()],
        }).compileComponents();

        fixture = TestBed.createComponent(InternComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the profile tab', () => {
        const element: HTMLElement = fixture.nativeElement;
        expect(element.textContent).toContain('Mein Profil');
    });

    it('should hide the members tab without member management role', () => {
        const element: HTMLElement = fixture.nativeElement;
        expect(element.textContent).not.toContain('Mitglieder');
    });
});
