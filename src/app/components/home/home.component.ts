import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { MovieDetails } from '../../models/omdb.model';
import { OmdbService } from '../../services/omdb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public movieDetails: MovieDetails[] = [];

  constructor(private readonly omdbService: OmdbService) { }

  ngOnInit(): void {
    this.getMovieDetails();
  }

  private getMovieDetails(): void{
    forkJoin( [
      this.omdbService.getMovieByID('tt0468569'),
      this.omdbService.getMovieByID('tt4154796')
    ]).subscribe((responese) => {
        this.movieDetails = responese;
    })
  }

}
