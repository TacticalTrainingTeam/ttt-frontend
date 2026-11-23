import { Routes } from '@angular/router';
import { SEO_DEFAULTS } from './shared/constants/seo';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/main/home/home.component').then((m) => m.HomeComponent),
        title: SEO_DEFAULTS.title,
        pathMatch: 'full',
    },
    {
        path: 'impressum',
        loadComponent: () => import('./components/main/impressum/impressum.component').then((m) => m.ImpressumComponent),
        title: 'Impressum | Tactical Training Team',
        data: { description: 'Impressum und Kontaktangaben des Tactical Training Teams.' },
    },
    {
        path: 'datenschutz',
        loadComponent: () => import('./components/main/datenschutz/datenschutz.component').then((m) => m.DatenschutzComponent),
        title: 'Datenschutz | Tactical Training Team',
        data: {
            description: 'Datenschutzerklärung des Tactical Training Teams: welche Daten wir auf tacticalteam.de verarbeiten und warum.',
        },
    },
    {
        path: 'datenschutz/social-media',
        loadComponent: () =>
            import('./components/main/datenschutz/datenschutz-social-media.component').then((m) => m.DatenschutzSocialMediaComponent),
        title: 'Datenschutz für Social Media | Tactical Training Team',
        data: { description: 'Datenschutzhinweise zu den Social-Media-Kanälen des Tactical Training Teams.' },
    },
    {
        path: 'chronik',
        loadComponent: () => import('./components/main/chronik/chronik.component').then((m) => m.ChronikComponent),
        title: 'Chronik – Unsere Geschichte seit 2013 | Tactical Training Team',
        data: {
            description:
                'Die Geschichte des Tactical Training Teams: vom Projekt GT-Kommando bis zu den Kampagnen und Operationen von heute.',
        },
    },
    {
        path: 'mitmachen',
        loadComponent: () => import('./components/main/mitmachen/mitmachen.component').then((m) => m.MitmachenComponent),
        title: 'Mitmachen – Arma Events | Tactical Training Team',
        data: { description: 'So wirst du Teil des TTT: als Rekrut oder Gast, mit Arma3Sync-Setup und deinem ersten Event bei uns.' },
    },
    {
        path: 'medien',
        loadComponent: () => import('./components/main/medien/medien.component').then((m) => m.MedienComponent),
        title: 'Medien & Streams | Tactical Training Team',
        data: { description: 'Social Media, Videos, Streams und Corporate Design des Tactical Training Teams.' },
    },
    // Temporaer deaktiviert bis die Member-API live ist
    // {
    //     path: 'aufstellung',
    //     loadComponent: () => import('./components/main/aufstellung/aufstellung.component').then((m) => m.AufstellungComponent),
    //     title: 'Aufstellung & Mitglieder | Tactical Training Team',
    // },
    // Wildcard route - redirect unknown routes to home
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];
