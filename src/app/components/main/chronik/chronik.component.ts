import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { TimelineEvent } from '../../../shared/types/chronik.types';
import { ChronikOriginComponent } from './sections/origin/chronik-origin.component';
import { ChronikTimelineComponent } from './sections/timeline/chronik-timeline.component';
import { ChronikFictionComponent } from './sections/fiction/chronik-fiction.component';
import { ChronikCtaComponent } from './sections/cta/chronik-cta.component';
import { TTT_LINKS } from '../../../shared/constants/external-links';

@Component({
    selector: 'ttt-chronik',
    standalone: true,
    imports: [PageLayoutComponent, ChronikOriginComponent, ChronikTimelineComponent, ChronikFictionComponent, ChronikCtaComponent],
    templateUrl: './chronik.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChronikComponent {
    readonly pageTitle = 'Chronik';
    readonly heroImage = '/img/banner/banner-img5.webp';
    readonly pageSubtitle = 'Geschichte des Tactical Training Teams';
    readonly fictionDocumentationLink = TTT_LINKS.fictionDocumentation;

    readonly timelineEvents: TimelineEvent[] = [
        {
            id: 'genesis',
            title: 'Operation Genesis',
            date: '11. November 2013',
            type: 'anniversary',
            description: 'Offizielle Gründung des Tactical Training Teams',
            details: [
                'Nachfolger des GT-Kommando-Projekts',
                'Marktanalyse der Arma3-Community durchgeführt',
                'Kombination aus Training, Teamspiel und offener Community',
            ],
        },
        {
            id: 'intel',
            title: 'Operation Intel',
            date: 'März 2014',
            type: 'milestone',
            description: 'Veröffentlichung des ersten TTT-Newsletters',
            details: ['Erste offizielle Kommunikation an die Mitglieder', 'Etablierung regelmäßiger Informationskanäle'],
        },
        {
            id: 'rookie',
            title: 'Operation Rookie',
            date: 'Mai 2015',
            type: 'system',
            description: 'Einführung von Einsteiger-Events und Managementposten',
            details: [
                'Strukturierte Ausbildungsprogramme entwickelt',
                'Managementposten zur besseren Organisation',
                'Fokus auf Einsteiger-freundliche Events',
            ],
        },
        {
            id: 'handover',
            title: 'Operation Handover',
            date: 'Juni 2016',
            type: 'system',
            description: 'Beendigung des TTT-Public-Servers und Übertragung an ArmaWorld',
            details: ['Strategische Neuausrichtung der Community', 'Fokus auf Events statt Public Gaming'],
        },
        {
            id: 'gladiator',
            title: 'Operation Gladiator',
            date: 'September 2018',
            type: 'milestone',
            description: 'Neue Sparte im TTT: TVT-Team und E-Sport-Ära',
            details: ['Electronic Sports Masters™ (ESM)', 'Wettkampforientierte Missionsformate', 'Professionelle E-Sport-Aktivitäten'],
        },
        {
            id: 'rebrand',
            title: 'Operation Rebrand',
            date: 'Januar 2019',
            type: 'milestone',
            description: 'Das neue Corporate-Design wird eingeführt',
            details: [
                'Moderne visuelle Identität entwickelt',
                'Einheitliches Branding für alle Plattformen',
                'Professioneller Auftritt etabliert',
            ],
        },
        {
            id: 'hierarchy',
            title: 'Operation Hierarchy',
            date: 'März 2019',
            type: 'system',
            description: 'TTT-Rangneustrukturierung zu Soldat, Veteran und Gast',
            details: ['Vereinfachte Rangstruktur eingeführt', 'Etablierung von Offiziersposten'],
        },
        {
            id: 'digital',
            title: 'Operation Digital',
            date: 'September 2020',
            type: 'milestone',
            description: 'Neuer TTT-Webauftritt mit modernem Design',
            details: ['Responsive Design für alle Geräte', 'Verbesserte Navigation', 'Integration moderner Webtechnologien'],
        },
        {
            id: 'knowledge',
            title: 'Operation Knowledge',
            date: 'Oktober 2021',
            type: 'milestone',
            description: 'TTT-Wiki mit über 150 Informationsseiten veröffentlicht',
            details: [
                'Umfassende Wissensdatenbank erstellt',
                'Taktische Handbücher und Guides',
                'Ablösung der alten Taktik-Fibel',
                'Community-basierte Inhaltserstellung',
            ],
        },
        {
            id: 'decade',
            title: 'Operation Decade',
            date: '11. November 2023',
            type: 'anniversary',
            description: '10 Jahre TTT - Eine erfolgreiche Dekade der taktischen Exzellenz',
            details: [
                'Eine der ältesten deutschsprachigen Arma3-Communities',
                'Über 1000 durchgeführte Events und Missionen',
                'Hunderte ausgebildete Community-Mitglieder',
            ],
        },
        {
            id: 'reforger',
            title: 'Operation Reforger',
            date: 'September 2024',
            type: 'milestone',
            description: 'Arma Reforger wird neben Arma 3 Teil des TTT-Spielbetriebs',
            details: [
                'Erste Events und Trainings in Arma Reforger',
                'Paralleler Spielbetrieb in beiden Arma-Titeln',
                'Vorbereitung auf die Zukunft der Arma-Reihe',
            ],
        },
    ];
}
