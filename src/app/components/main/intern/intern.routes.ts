import { Routes } from '@angular/router';
import { authGuard, catalogAdminGuard, memberAdminGuard } from '../../../core/guards/auth.guard';
import { InternComponent } from './intern.component';

export const INTERN_ROUTES: Routes = [
    {
        path: '',
        component: InternComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./sections/profile/intern-profile.component').then((m) => m.InternProfileComponent),
                title: 'Kaserne – Mein Profil | Tactical Training Team',
                pathMatch: 'full',
            },
            {
                path: 'mitglieder',
                loadComponent: () => import('./sections/members/intern-members.component').then((m) => m.InternMembersComponent),
                title: 'Kaserne – Mitglieder | Tactical Training Team',
                canActivate: [memberAdminGuard],
            },
            {
                path: 'admin',
                loadComponent: () => import('./sections/admin/intern-admin.component').then((m) => m.InternAdminComponent),
                title: 'Kaserne – Administration | Tactical Training Team',
                canActivate: [catalogAdminGuard],
            },
        ],
    },
];
