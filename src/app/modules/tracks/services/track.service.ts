import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TrackModel } from '@core/models/tracks.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private readonly URL = environment.api

  dataTracksTrending$ : Observable<TrackModel[]> = of([])
  dataTracksRandom$ : Observable<any> = of([])

  constructor(private http: HttpClient) { }

  getAllTracks$(): Observable<any> {
    return this.http.get(`${this.URL}/tracks`)
      .pipe(
        map(({ data }: any) => {
          return data
        }),
        catchError((err) => {
          console.log('error getting all tracks',err)
          return of([])
        })
      )
  }

}
