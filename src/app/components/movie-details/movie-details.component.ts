import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieDetails } from 'src/app/models/omdb.model';
import { OmdbService } from 'src/app/services/omdb.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  public showLoader = true;
  public movieDetails?: MovieDetails;
  public readMore = true;
  constructor(private readonly omdbService: OmdbService,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
    this.showLoader = true;
    this.omdbService.getMovieByID(this.data).subscribe((response) => {
      this.showLoader = false;
      if(response.Response === 'True') {
        this.movieDetails = response;
      }
    },(error) => {
      console.log(error);
      this.showLoader = false;
    })
  }

}
