import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '../../services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrl: './media-player.component.css'
})
export class MediaPlayerComponent implements OnInit, OnDestroy {

  mockCover: TrackModel = {
    cover: '',
    album: 'Gioli',
    name: 'Bebe',
    url: '',
    _id: 1
  }
  listObservers$: Array<Subscription> = []

  constructor(private multimediaService: MultimediaService) {}

  ngOnInit(): void {
    const observer1$ : Subscription = this.multimediaService.callback.subscribe(
      (response: TrackModel) => {
          console.log("recibiendo cancion ", response)
      }
    )
    this.listObservers$ = [observer1$]
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())
  }
}
