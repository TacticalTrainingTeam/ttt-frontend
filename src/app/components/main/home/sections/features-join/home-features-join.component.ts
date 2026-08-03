import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionHeaderComponent } from '../../../../../shared/components/section-header/section-header.component';

@Component({
    selector: 'ttt-home-features-join',
    standalone: true,
    imports: [SectionHeaderComponent],
    templateUrl: './home-features-join.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeFeaturesJoinComponent {}
