import { Component, OnDestroy, OnInit, NgModule } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '../../services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrl: './media-player.component.css'
})
export class MediaPlayerComponent implements OnInit, OnDestroy {

  mockCover!: TrackModel
  listObservers$: Array<Subscription> = []
  state: string = 'paused'

  constructor(public multimediaService: MultimediaService) {}

  ngOnInit(): void {
    const observer1$ = this.multimediaService.playerStatus$
    .subscribe(status => this.state = status)

    this.listObservers$ = [observer1$]
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())
  }
}
