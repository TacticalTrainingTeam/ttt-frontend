import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { MedienLiveStreamsComponent } from './medien-live-streams.component';

describe('MedienLiveStreamsComponent', () => {
    let component: MedienLiveStreamsComponent;
    let fixture: ComponentFixture<MedienLiveStreamsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MedienLiveStreamsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MedienLiveStreamsComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('liveStreams$', of([]));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
