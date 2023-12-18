import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'process';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MovieDetails, MovieDetailsList } from '../models/omdb.model';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {


  constructor(private readonly http: HttpClient) { }

  public getMovieByID(id: string): Observable<MovieDetails>{
    const url = `${environment.omdbBaseURL}?apikey=${environment.omdbAPIKey}&i=${id}`;
    return this.http.get<MovieDetails>(url);
  }

  public searchMovie(search: string, page: number): Observable<MovieDetailsList>{
    const url = `${environment.omdbBaseURL}?apikey=${environment.omdbAPIKey}&s=${search}&page=${page}`
    return this.http.get<MovieDetailsList>(url);
  }
}
