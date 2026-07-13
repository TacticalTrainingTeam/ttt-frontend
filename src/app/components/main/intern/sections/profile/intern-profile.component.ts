import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Avatar } from 'primeng/avatar';
import { ButtonDirective } from 'primeng/button';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Tag } from 'primeng/tag';
import { InputText } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';
import { InternService } from '../../../../../core/services/intern.service';
import { PlatformIds, UserProfile } from '../../../../../shared/types/intern.types';
import { RANK_INFO } from '../../../../../shared/constants/rank-display';

@Component({
    selector: 'ttt-intern-profile',
    standalone: true,
    imports: [FormsModule, Avatar, ButtonDirective, InputText, ProgressSpinner, Tag, Tooltip],
    templateUrl: './intern-profile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternProfileComponent implements OnInit {
    private readonly internService = inject(InternService);

    readonly rankInfo = RANK_INFO;

    readonly profile = signal<UserProfile | null>(null);
    readonly editMode = signal(false);
    readonly saving = signal(false);

    /** Draft copy while editing; discarded on cancel */
    draft: PlatformIds = { steamId: '', xboxId: '', playstationId: '', armaIngameName: '', discordId: '' };

    ngOnInit(): void {
        this.internService.getOwnProfile().subscribe((profile) => this.profile.set(profile));
    }

    getFormattedMemberSince(dateString: string): string {
        return new Date(dateString).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    startEdit(): void {
        const profile = this.profile();
        if (!profile) {
            return;
        }
        this.draft = { ...profile.platformIds };
        this.editMode.set(true);
    }

    cancelEdit(): void {
        this.editMode.set(false);
    }

    saveEdit(): void {
        const editableIds = {
            steamId: this.draft.steamId,
            xboxId: this.draft.xboxId,
            playstationId: this.draft.playstationId,
            armaIngameName: this.draft.armaIngameName,
        };
        this.saving.set(true);
        this.internService.updateOwnPlatformIds(editableIds).subscribe({
            next: (profile) => {
                this.profile.set(profile);
                this.saving.set(false);
                this.editMode.set(false);
            },
            error: () => this.saving.set(false),
        });
    }
}
