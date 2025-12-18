import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LeftSidebarComponent } from './left-sidebar.component';
import { EventsService } from '../../../core/services/events.service';

describe('LeftSidebarComponent', () => {
    let component: LeftSidebarComponent;
    let fixture: ComponentFixture<LeftSidebarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LeftSidebarComponent, HttpClientTestingModule],
            providers: [EventsService],
        }).compileComponents();

        fixture = TestBed.createComponent(LeftSidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display events', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('nav')).toBeTruthy();
        expect(compiled.textContent).toContain('Nächste Events');
    });

    it('should have events data', () => {
        expect(component.events$).toBeDefined();
    });
});
