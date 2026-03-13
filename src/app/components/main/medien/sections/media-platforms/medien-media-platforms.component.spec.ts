import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedienMediaPlatformsComponent } from './medien-media-platforms.component';

describe('MedienMediaPlatformsComponent', () => {
    let component: MedienMediaPlatformsComponent;
    let fixture: ComponentFixture<MedienMediaPlatformsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MedienMediaPlatformsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MedienMediaPlatformsComponent);
        component = fixture.componentInstance;
        component.mediaPlatforms = [];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
