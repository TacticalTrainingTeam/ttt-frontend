import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { MedienChannelsComponent } from './medien-channels.component';

describe('MedienChannelsComponent', () => {
    let component: MedienChannelsComponent;
    let fixture: ComponentFixture<MedienChannelsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MedienChannelsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MedienChannelsComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('mediaPlatforms', []);
        fixture.componentRef.setInput('liveStreams$', of([]));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show the empty state when no streams are live', () => {
        const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
        expect(text).toContain('Derzeit sind keine Live-Übertragungen aktiv.');
    });
});
