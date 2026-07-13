import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { InternProfileComponent } from './intern-profile.component';

describe('InternProfileComponent', () => {
    let component: InternProfileComponent;
    let fixture: ComponentFixture<InternProfileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InternProfileComponent],
            providers: [provideNoopAnimations(), provideHttpClient()],
        }).compileComponents();

        fixture = TestBed.createComponent(InternProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should enter edit mode with a draft copy', () => {
        component.startEdit();

        expect(component.editMode()).toBeTrue();
        expect(component.draft).toEqual(component.profile()!.platformIds);
        expect(component.draft).not.toBe(component.profile()!.platformIds);
    });

    it('should discard draft changes on cancel', () => {
        const originalSteamId = component.profile()!.platformIds.steamId;
        component.startEdit();
        component.draft.steamId = 'changed';

        component.cancelEdit();

        expect(component.editMode()).toBeFalse();
        expect(component.profile()!.platformIds.steamId).toBe(originalSteamId);
    });

    it('should save draft changes but keep the discord id read-only', () => {
        const originalDiscordId = component.profile()!.platformIds.discordId;
        component.startEdit();
        component.draft.steamId = 'new-steam-id';
        component.draft.discordId = 'manipulated';

        component.saveEdit();

        expect(component.editMode()).toBeFalse();
        expect(component.profile()!.platformIds.steamId).toBe('new-steam-id');
        expect(component.profile()!.platformIds.discordId).toBe(originalDiscordId);
    });
});
