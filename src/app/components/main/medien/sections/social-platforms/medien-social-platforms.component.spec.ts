import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedienSocialPlatformsComponent } from './medien-social-platforms.component';

describe('MedienSocialPlatformsComponent', () => {
    let component: MedienSocialPlatformsComponent;
    let fixture: ComponentFixture<MedienSocialPlatformsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MedienSocialPlatformsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MedienSocialPlatformsComponent);
        component = fixture.componentInstance;
        component.socialPlatforms = [];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
