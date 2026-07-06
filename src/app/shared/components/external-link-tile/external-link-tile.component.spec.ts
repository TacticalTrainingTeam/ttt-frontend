import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExternalLinkTileComponent } from './external-link-tile.component';

describe('ExternalLinkTileComponent', () => {
    let component: ExternalLinkTileComponent;
    let fixture: ComponentFixture<ExternalLinkTileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ExternalLinkTileComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ExternalLinkTileComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('href', 'https://example.com');
        fixture.componentRef.setInput('title', 'Example');
        fixture.componentRef.setInput('description', 'Example description');
        fixture.componentRef.setInput('iconClass', 'pi pi-external-link');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render a secure external link', () => {
        const link: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
        expect(link.href).toBe('https://example.com/');
        expect(link.target).toBe('_blank');
        expect(link.rel).toBe('noopener noreferrer');
    });

    it('should render title and description', () => {
        const element: HTMLElement = fixture.nativeElement;
        expect(element.querySelector('h3')?.textContent).toContain('Example');
        expect(element.querySelector('p')?.textContent).toContain('Example description');
    });

    it('should fall back to a generated aria-label when none is set', () => {
        const link: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
        expect(link.getAttribute('aria-label')).toBe('Example öffnen');
    });

    it('should only render the display URL when set', () => {
        expect(fixture.nativeElement.textContent).not.toContain('example.com');

        fixture.componentRef.setInput('displayUrl', 'example.com');
        fixture.detectChanges();

        expect(fixture.nativeElement.textContent).toContain('example.com');
    });
});
