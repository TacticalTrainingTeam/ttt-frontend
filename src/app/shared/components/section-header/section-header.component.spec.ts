import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionHeaderComponent } from './section-header.component';

describe('SectionHeaderComponent', () => {
    let component: SectionHeaderComponent;
    let fixture: ComponentFixture<SectionHeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SectionHeaderComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SectionHeaderComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('title', 'Section Title');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the title', () => {
        const heading = fixture.nativeElement.querySelector('h2');
        expect(heading.textContent).toContain('Section Title');
    });

    it('should only render a subtitle when set', () => {
        expect(fixture.nativeElement.querySelector('p')).toBeNull();

        fixture.componentRef.setInput('subtitle', 'Section Subtitle');
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('p').textContent).toContain('Section Subtitle');
    });
});
