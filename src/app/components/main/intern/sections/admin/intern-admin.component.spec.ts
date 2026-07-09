import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { InternAdminComponent } from './intern-admin.component';

describe('InternAdminComponent', () => {
    let component: InternAdminComponent;
    let fixture: ComponentFixture<InternAdminComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InternAdminComponent],
            providers: [provideNoopAnimations(), provideHttpClient()],
        }).compileComponents();

        fixture = TestBed.createComponent(InternAdminComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load both catalogs', () => {
        expect(component.medals().length).toBeGreaterThan(0);
        expect(component.ribbons().length).toBeGreaterThan(0);
    });

    it('should create a medal from the draft and close the dialog', () => {
        const before = component.medals().length;
        component.openDialog('medal');
        component.medalDraft = { name: 'Testorden', description: 'Test', image: '' };

        component.saveMedal();

        expect(component.medals().length).toBe(before + 1);
        expect(component.activeDialog()).toBeNull();
    });

    it('should edit an existing medal', () => {
        const target = component.medals()[0];
        component.openEditMedal(target);
        component.medalDraft = { ...component.medalDraft, name: 'Umbenannt' };

        component.saveMedal();

        expect(component.medals().length).toBeGreaterThan(0);
        expect(component.medals().find((medal) => medal.id === target.id)?.name).toBe('Umbenannt');
        expect(component.activeDialog()).toBeNull();
    });
});
