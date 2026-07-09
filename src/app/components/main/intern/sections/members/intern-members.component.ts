import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Avatar } from 'primeng/avatar';
import { ButtonDirective } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { MultiSelect } from 'primeng/multiselect';
import { Table, TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { CatalogService } from '../../../../../core/services/catalog.service';
import { InternService } from '../../../../../core/services/intern.service';
import { PlatformIds, UserProfile } from '../../../../../shared/types/intern.types';
import { Medal, RankType } from '../../../../../shared/types/member.types';
import { RANK_INFO } from '../../../../../shared/constants/rank-display';
import { RankInfo } from '../../../../../shared/types/aufstellung.types';

/** Flattened row so the table can sort and filter nested fields */
export interface MemberRow extends UserProfile {
    rankLabel: string;
    rankPriority: number;
    abteilungenNames: string;
    armaName: string;
    steamId: string;
    discordId: string;
}

@Component({
    selector: 'ttt-intern-members',
    standalone: true,
    imports: [CommonModule, FormsModule, Avatar, ButtonDirective, Dialog, InputText, MultiSelect, TableModule, Tag, Tooltip],
    templateUrl: './intern-members.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternMembersComponent implements OnInit {
    private readonly internService = inject(InternService);
    private readonly catalogService = inject(CatalogService);

    readonly members = signal<UserProfile[]>([]);
    readonly medalCatalog = signal<Medal[]>([]);
    readonly selectedMember = signal<UserProfile | null>(null);
    readonly saving = signal(false);

    readonly rows = computed<MemberRow[]>(() =>
        this.members().map((member) => ({
            ...member,
            rankLabel: RANK_INFO[member.rank].name,
            rankPriority: RANK_INFO[member.rank].priority,
            abteilungenNames: member.abteilungen.map((abteilung) => abteilung.name).join(', '),
            armaName: member.platformIds.armaIngameName,
            steamId: member.platformIds.steamId,
            discordId: member.platformIds.discordId,
        }))
    );

    /** Draft copies while editing; discarded when the dialog closes without saving */
    draft: PlatformIds = { steamId: '', xboxId: '', playstationId: '', armaIngameName: '', discordId: '' };
    draftMedalIds: string[] = [];

    ngOnInit(): void {
        this.internService.getMembers().subscribe((members) => this.members.set(members));
        this.catalogService.getMedals().subscribe((medals) => this.medalCatalog.set(medals));
    }

    /** Typed accessor for the untyped p-table template context */
    getRankLabel(rank: RankType): RankInfo {
        return RANK_INFO[rank];
    }

    onGlobalFilter(table: Table, event: Event): void {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openEdit(member: UserProfile): void {
        this.draft = { ...member.platformIds };
        this.draftMedalIds = member.medals.map((medal) => medal.id);
        this.selectedMember.set(member);
    }

    onEditVisibleChange(visible: boolean): void {
        if (!visible) {
            this.selectedMember.set(null);
        }
    }

    saveEdit(): void {
        const selected = this.selectedMember();
        if (!selected) {
            return;
        }
        const editableIds = {
            steamId: this.draft.steamId,
            xboxId: this.draft.xboxId,
            playstationId: this.draft.playstationId,
            armaIngameName: this.draft.armaIngameName,
        };
        this.saving.set(true);
        this.internService.updateMember(selected.id, { platformIds: editableIds, medalIds: this.draftMedalIds }).subscribe({
            next: (updated) => {
                this.members.update((members) => members.map((member) => (member.id === updated.id ? updated : member)));
                this.saving.set(false);
                this.selectedMember.set(null);
            },
            error: () => this.saving.set(false),
        });
    }
}
