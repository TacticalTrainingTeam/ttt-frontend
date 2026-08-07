import { ChangeDetectionStrategy, Component } from '@angular/core';
// Temporaer deaktiviert bis die Member-API live ist
// import { RouterLink } from '@angular/router';
// import { ButtonDirective } from '@openng/optimus-ui/button';

@Component({
    selector: 'ttt-home-orbat',
    standalone: true,
    // imports: [RouterLink, ButtonDirective],
    templateUrl: './home-orbat.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeOrbatComponent {
    readonly rankTiles = [
        { icon: '/img/ranks/TTT-Icon_Offizier.png', alt: 'Offizier', title: 'Offiziere', description: 'Führen die TTT-Abteilungen' },
        {
            icon: '/img/ranks/TTT-Icon_Unteroffizier.png',
            alt: 'Unteroffizier',
            title: 'Unteroffiziere',
            description: 'Direkte Unterstützer der Offiziere',
        },
        {
            icon: '/img/ranks/TTT-Icon_Soldat-Veteran.png',
            alt: 'Veteran',
            title: 'Veteranen',
            description: 'Besonders engagierte Mitglieder',
        },
        { icon: '/img/ranks/TTT-Icon_Soldat-Veteran.png', alt: 'Soldat', title: 'Soldaten', description: 'Vollwertige TTT-Mitglieder' },
        { icon: '/img/ranks/TTT-Icon_Rekrut.png', alt: 'Rekrut', title: 'Rekruten', description: 'Angehende TTT-Mitglieder' },
        { icon: '/img/ranks/TTT-Icon_Gast.png', alt: 'Gast', title: 'Gäste', description: 'Freie Mitspieler bei Events' },
    ];
}
