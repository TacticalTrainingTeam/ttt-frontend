import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { TimelineEvent, TimelineEventType } from '../../../shared/types/chronik.types';
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

    timelineEvents: TimelineEvent[] = [
        this.createTimelineEvent(
            'genesis',
            'Operation Genesis',
            '11. November 2013',
            'anniversary',
            'Offizielle Gründung des Tactical Training Teams',
            [
                'Nachfolger des GT-Kommando-Projekts',
                'Marktanalyse der Arma3-Community durchgeführt',
                'Kombination aus Training, Teamspiel und offener Community',
            ]
        ),
        this.createTimelineEvent('intel', 'Operation Intel', 'März 2014', 'milestone', 'Veröffentlichung des ersten TTT-Newsletters', [
            'Erste offizielle Kommunikation an die Mitglieder',
            'Etablierung regelmäßiger Informationskanäle',
        ]),
        this.createTimelineEvent(
            'rookie',
            'Operation Rookie',
            'Mai 2015',
            'system',
            'Einführung von Einsteiger-Events und Managementposten',
            [
                'Strukturierte Ausbildungsprogramme entwickelt',
                'Managementposten zur besseren Organisation',
                'Fokus auf Einsteiger-freundliche Events',
            ]
        ),
        this.createTimelineEvent(
            'handover',
            'Operation Handover',
            'Juni 2016',
            'system',
            'Beendigung des TTT-Public-Servers und Übertragung an ArmaWorld',
            ['Strategische Neuausrichtung der Community', 'Fokus auf Events statt Public Gaming']
        ),
        this.createTimelineEvent(
            'gladiator',
            'Operation Gladiator',
            'September 2018',
            'milestone',
            'Neue Sparte im TTT: TVT-Team und E-Sport-Ära',
            ['Electronic Sports Masters™ (ESM)', 'Wettkampforientierte Missionsformate', 'Professionelle E-Sport-Aktivitäten']
        ),
        this.createTimelineEvent('rebrand', 'Operation Rebrand', 'Januar 2019', 'milestone', 'Das neue Corporate-Design wird eingeführt', [
            'Moderne visuelle Identität entwickelt',
            'Einheitliches Branding für alle Plattformen',
            'Professioneller Auftritt etabliert',
        ]),
        this.createTimelineEvent(
            'hierarchy',
            'Operation Hierarchy',
            'März 2019',
            'system',
            'TTT-Rangneustrukturierung zu Soldat, Veteran und Gast',
            ['Vereinfachte Rangstruktur eingeführt', 'Etablierung von Offiziersposten']
        ),
        this.createTimelineEvent(
            'digital',
            'Operation Digital',
            'September 2020',
            'milestone',
            'Neuer TTT-Webauftritt mit modernem Design',
            ['Responsive Design für alle Geräte', 'Verbesserte Navigation', 'Integration moderner Webtechnologien']
        ),
        this.createTimelineEvent(
            'knowledge',
            'Operation Knowledge',
            'Oktober 2021',
            'milestone',
            'TTT-Wiki mit über 150 Informationsseiten veröffentlicht',
            [
                'Umfassende Wissensdatenbank erstellt',
                'Taktische Handbücher und Guides',
                'Ablösung der alten Taktik-Fibel',
                'Community-basierte Inhaltserstellung',
            ]
        ),
        this.createTimelineEvent(
            'decade',
            'Operation Decade',
            '11. November 2023',
            'anniversary',
            '10 Jahre TTT - Eine erfolgreiche Dekade der taktischen Exzellenz',
            [
                'Eine der ältesten deutschsprachigen Arma3-Communities',
                'Über 1000 durchgeführte Events und Missionen',
                'Hunderte ausgebildete Community-Mitglieder',
            ]
        ),
        this.createTimelineEvent(
            'reforger',
            'Operation Reforger',
            'September 2024',
            'milestone',
            'Arma Reforger wird neben Arma 3 Teil des TTT-Spielbetriebs',
            [
                'Erste Events und Trainings in Arma Reforger',
                'Paralleler Spielbetrieb in beiden Arma-Titeln',
                'Vorbereitung auf die Zukunft der Arma-Reihe',
            ]
        ),
    ];

    private createTimelineEvent(
        id: string,
        title: string,
        date: string,
        type: TimelineEventType,
        description: string,
        details: string[]
    ): TimelineEvent {
        return {
            id,
            title,
            date,
            type,
            description,
            details,
            expanded: false,
        };
    }
}
