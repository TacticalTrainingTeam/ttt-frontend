import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Tab, TabList, Tabs } from 'primeng/tabs';
import { AuthService } from '../../../core/services/auth.service';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';

@Component({
    selector: 'ttt-intern',
    standalone: true,
    imports: [RouterOutlet, RouterLink, Tabs, TabList, Tab, PageLayoutComponent],
    templateUrl: './intern.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternComponent {
    private readonly router = inject(Router);
    private readonly auth = inject(AuthService);

    readonly pageTitle = 'Kaserne';
    readonly pageSubtitle = 'Der interne Bereich des Tactical Training Teams';

    /** Management tabs are only offered to authorized users */
    readonly tabs = computed(() => {
        const tabs = [{ route: '/intern', label: 'Mein Profil' }];
        if (this.auth.canManageMembers()) {
            tabs.push({ route: '/intern/mitglieder', label: 'Mitglieder' });
        }
        if (this.auth.canManageCatalog()) {
            tabs.push({ route: '/intern/admin', label: 'Admin' });
        }
        return tabs;
    });

    /** Active tab follows the current route */
    readonly activeTab = toSignal(
        this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            map(() => this.router.url.split('?')[0])
        ),
        { initialValue: this.router.url.split('?')[0] }
    );
}
