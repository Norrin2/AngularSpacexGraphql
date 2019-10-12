import { Component, ChangeDetectionStrategy } from '@angular/core';
import { map } from 'rxjs/operators';

import { PastLaunchesListGQL } from '../services/spacexGraphql.service';
import {MatDialog} from '@angular/material';
import {LaunchDetailsComponent} from '../launch-details/launch-details.component';

@Component({
  selector: 'app-launch-list',
  templateUrl: './launch-list.component.html',
  styleUrls: ['./launch-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchListComponent {

  constructor(private readonly pastLaunchesService: PastLaunchesListGQL,
              private dialog: MatDialog) {}

  pastLaunches$ = this.pastLaunchesService
    .fetch({ limit: 25 })
    .pipe(map((res) => res.data.launchesPast));

  public loadDetails(id: string) {
    return this.dialog.open(LaunchDetailsComponent, {minWidth: '50%' , maxHeight: '75vh',
       data: {id}, position: {top: '4%'}});
  }
}
