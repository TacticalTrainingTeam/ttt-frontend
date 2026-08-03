import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HomeBranchesComponent } from './home-branches.component';

describe('HomeBranchesComponent', () => {
    let component: HomeBranchesComponent;
    let fixture: ComponentFixture<HomeBranchesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HomeBranchesComponent],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(HomeBranchesComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('branches', [
            { id: 'infanterie', name: 'Infanterie', icon: '/img/truppengattungen/icon-infanterie.webp', description: 'desc' },
        ]);
        fixture.componentRef.setInput('communityStats', [{ value: '80+', label: 'Mitglieder', color: 'text-tttGreen' }]);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render a card per branch', () => {
        const cards = fixture.nativeElement.querySelectorAll('h3');
        expect(cards.length).toBe(1);
        expect(cards[0].textContent).toContain('Infanterie');
    });
});
