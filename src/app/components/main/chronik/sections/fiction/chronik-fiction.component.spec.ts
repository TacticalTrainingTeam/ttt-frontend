import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChronikFictionComponent } from './chronik-fiction.component';

describe('ChronikFictionComponent', () => {
    let component: ChronikFictionComponent;
    let fixture: ComponentFixture<ChronikFictionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChronikFictionComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ChronikFictionComponent);
        component = fixture.componentInstance;
        component.fictionDocumentationLink = 'https://example.com';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
