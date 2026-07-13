import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { FileUpload, FileUploadHandlerEvent } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { CatalogService } from '../../../../../core/services/catalog.service';
import { CampaignRibbon, Medal } from '../../../../../shared/types/member.types';

/** Which create dialog is open */
type CatalogDialog = 'medal' | 'ribbon' | null;

@Component({
    selector: 'ttt-intern-admin',
    standalone: true,
    imports: [FormsModule, ButtonDirective, ConfirmDialog, Dialog, FileUpload, InputText, TableModule],
    providers: [ConfirmationService],
    templateUrl: './intern-admin.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternAdminComponent implements OnInit {
    private readonly catalogService = inject(CatalogService);
    private readonly confirmationService = inject(ConfirmationService);

    readonly medals = signal<Medal[]>([]);
    readonly ribbons = signal<CampaignRibbon[]>([]);

    readonly activeDialog = signal<CatalogDialog>(null);
    readonly saving = signal(false);

    /** Ids of the entries being edited; null while creating */
    readonly editingMedalId = signal<string | null>(null);
    readonly editingRibbonId = signal<string | null>(null);
    readonly uploading = signal(false);

    /** Drafts for the dialogs; image urls come from uploadImage() */
    medalDraft = { name: '', description: '', image: '' };
    ribbonDraft = { campaign: '', year: '', image: '' };

    ngOnInit(): void {
        this.catalogService.getMedals().subscribe((medals) => this.medals.set(medals));
        this.catalogService.getCampaignRibbons().subscribe((ribbons) => this.ribbons.set(ribbons));
    }

    openDialog(dialog: Exclude<CatalogDialog, null>): void {
        this.medalDraft = { name: '', description: '', image: '' };
        this.ribbonDraft = { campaign: '', year: '', image: '' };
        this.editingMedalId.set(null);
        this.editingRibbonId.set(null);
        this.activeDialog.set(dialog);
    }

    openEditMedal(medal: Medal): void {
        this.medalDraft = { name: medal.name, description: medal.description, image: medal.image };
        this.editingMedalId.set(medal.id);
        this.activeDialog.set('medal');
    }

    openEditRibbon(ribbon: CampaignRibbon): void {
        this.ribbonDraft = { campaign: ribbon.campaign, year: ribbon.year, image: ribbon.image };
        this.editingRibbonId.set(ribbon.id);
        this.activeDialog.set('ribbon');
    }

    /** Uploads the selected image and stores the returned URL in the active draft */
    onImageUpload(event: FileUploadHandlerEvent, target: 'medal' | 'ribbon'): void {
        const file = event.files[0];
        if (!file) {
            return;
        }
        this.uploading.set(true);
        this.catalogService.uploadImage(file).subscribe({
            next: (url) => {
                if (target === 'medal') {
                    this.medalDraft = { ...this.medalDraft, image: url };
                } else {
                    this.ribbonDraft = { ...this.ribbonDraft, image: url };
                }
                this.uploading.set(false);
            },
            error: () => this.uploading.set(false),
        });
    }

    onDialogVisibleChange(visible: boolean): void {
        if (!visible) {
            this.activeDialog.set(null);
        }
    }

    saveMedal(): void {
        const editingId = this.editingMedalId();
        this.saving.set(true);
        const request$ = editingId
            ? this.catalogService.updateMedal(editingId, this.medalDraft)
            : this.catalogService.createMedal(this.medalDraft);
        request$.subscribe({
            next: (medal) => {
                this.medals.update((medals) =>
                    editingId ? medals.map((entry) => (entry.id === medal.id ? medal : entry)) : [...medals, medal]
                );
                this.saving.set(false);
                this.activeDialog.set(null);
            },
            error: () => this.saving.set(false),
        });
    }

    confirmDeleteMedal(medal: Medal): void {
        this.confirmationService.confirm({
            header: 'Auszeichnung entfernen',
            message: `Soll „${medal.name}" wirklich entfernt werden?`,
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Entfernen',
            rejectLabel: 'Abbrechen',
            defaultFocus: 'reject',
            accept: () => this.deleteMedal(medal),
        });
    }

    deleteMedal(medal: Medal): void {
        this.catalogService.deleteMedal(medal.id).subscribe(() => {
            this.medals.update((medals) => medals.filter((entry) => entry.id !== medal.id));
        });
    }

    saveRibbon(): void {
        const editingId = this.editingRibbonId();
        this.saving.set(true);
        const request$ = editingId
            ? this.catalogService.updateCampaignRibbon(editingId, this.ribbonDraft)
            : this.catalogService.createCampaignRibbon(this.ribbonDraft);
        request$.subscribe({
            next: (ribbon) => {
                this.ribbons.update((ribbons) =>
                    editingId ? ribbons.map((entry) => (entry.id === ribbon.id ? ribbon : entry)) : [...ribbons, ribbon]
                );
                this.saving.set(false);
                this.activeDialog.set(null);
            },
            error: () => this.saving.set(false),
        });
    }

    confirmDeleteRibbon(ribbon: CampaignRibbon): void {
        this.confirmationService.confirm({
            header: 'Kampagne entfernen',
            message: `Soll „${ribbon.campaign}" wirklich entfernt werden?`,
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Entfernen',
            rejectLabel: 'Abbrechen',
            defaultFocus: 'reject',
            accept: () => this.deleteRibbon(ribbon),
        });
    }

    deleteRibbon(ribbon: CampaignRibbon): void {
        this.catalogService.deleteCampaignRibbon(ribbon.id).subscribe(() => {
            this.ribbons.update((ribbons) => ribbons.filter((entry) => entry.id !== ribbon.id));
        });
    }
}
