import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHeaderComponent } from './page-header.component';

describe('PageHeaderComponent', () => {
    let component: PageHeaderComponent;
    let fixture: ComponentFixture<PageHeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PageHeaderComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PageHeaderComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('pageTitle', 'Chronik');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the title', () => {
        const heading = fixture.nativeElement.querySelector('h1');
        expect(heading.textContent).toContain('Chronik');
    });

    it('should omit the banner when not provided', () => {
        expect(fixture.nativeElement.querySelector('img')).toBeNull();
    });

    it('should render the banner when provided', () => {
        fixture.componentRef.setInput('heroImage', '/img/banner/banner-img1.webp');
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('img').getAttribute('src')).toBe('/img/banner/banner-img1.webp');
    });
});
