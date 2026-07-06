import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageLayoutComponent } from './page-layout.component';

describe('PageLayoutComponent', () => {
    let component: PageLayoutComponent;
    let fixture: ComponentFixture<PageLayoutComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PageLayoutComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PageLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not render a header when no pageTitle is set', () => {
        const heading = fixture.nativeElement.querySelector('h1');
        expect(heading).toBeNull();
    });

    it('should render title and subtitle when set', () => {
        fixture.componentRef.setInput('pageTitle', 'Test Title');
        fixture.componentRef.setInput('pageSubtitle', 'Test Subtitle');
        fixture.detectChanges();

        const heading = fixture.nativeElement.querySelector('h1');
        const subtitle = fixture.nativeElement.querySelector('p');
        expect(heading.textContent).toContain('Test Title');
        expect(subtitle.textContent).toContain('Test Subtitle');
    });
});
