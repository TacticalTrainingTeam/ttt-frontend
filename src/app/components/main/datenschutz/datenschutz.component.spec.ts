import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DatenschutzComponent } from './datenschutz.component';

describe('DatenschutzComponent', () => {
    let component: DatenschutzComponent;
    let fixture: ComponentFixture<DatenschutzComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DatenschutzComponent],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(DatenschutzComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have correct page title', () => {
        expect(component.pageTitle).toBe('Datenschutzerklärung');
    });

    it('should have external links defined', () => {
        expect(component.externalLinks).toBeDefined();
        expect(component.externalLinks.hetzner).toBeDefined();
        expect(component.externalLinks.cloudflare).toBeDefined();
        expect(component.externalLinks.mailchimp).toBeDefined();
    });
});
