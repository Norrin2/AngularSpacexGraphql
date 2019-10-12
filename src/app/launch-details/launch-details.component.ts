import {Component, ChangeDetectionStrategy, Inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { LaunchDetailsGQL } from '../services/spacexGraphql.service';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-launch-details',
  templateUrl: './launch-details.component.html',
  styleUrls: ['./launch-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchDetailsComponent {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly launchDetailsService: LaunchDetailsGQL,
    @Inject(MAT_DIALOG_DATA) public dados: any
  ) {}

  launchDetails$ = this.route.paramMap.pipe(
    map((params) => this.dados.id as string),
    switchMap((id) => this.launchDetailsService.fetch({ id })),
    map((res) => res.data.launch)
  );

}
