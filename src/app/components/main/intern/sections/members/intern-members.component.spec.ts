import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { InternMembersComponent } from './intern-members.component';

describe('InternMembersComponent', () => {
    let component: InternMembersComponent;
    let fixture: ComponentFixture<InternMembersComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InternMembersComponent],
            providers: [provideNoopAnimations(), provideHttpClient()],
        }).compileComponents();

        fixture = TestBed.createComponent(InternMembersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open the edit dialog with a draft copy', () => {
        const member = component.members()[1];

        component.openEdit(member);

        expect(component.selectedMember()).toBe(member);
        expect(component.draft).toEqual(member.platformIds);
        expect(component.draft).not.toBe(member.platformIds);
    });

    it('should save draft changes for the selected member but keep the discord id read-only', () => {
        const member = component.members()[1];
        component.openEdit(member);
        component.draft.armaIngameName = 'NewName';
        component.draft.discordId = 'manipulated';

        component.saveEdit();

        const updated = component.members()[1];
        expect(component.selectedMember()).toBeNull();
        expect(updated.platformIds.armaIngameName).toBe('NewName');
        expect(updated.platformIds.discordId).toBe(member.platformIds.discordId);
    });

    it('should clear the selection when the dialog closes', () => {
        component.openEdit(component.members()[0]);

        component.onEditVisibleChange(false);

        expect(component.selectedMember()).toBeNull();
    });
});
