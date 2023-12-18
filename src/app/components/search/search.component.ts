import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetails } from '../../models/omdb.model';
import { OmdbService } from '../../services/omdb.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public currentPage = 0;
  public showLoader = false;
  displayedColumns: string[] = ['Title', 'Year', 'Type'];
  dataSource: MovieDetails[] = [];

  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  public ctrlSearch: FormControl = new FormControl('');
  totalSearchResults = 0;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }



  constructor(private readonly omdbService: OmdbService,
    private readonly dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public searchByTitle(): void {

    this.showLoader = true;
    this.omdbService.searchMovie(this.ctrlSearch.value, this.currentPage + 1).subscribe((data) => {
      this.showLoader = false;
      if (data.Response === 'True') {
        this.totalSearchResults = Number(data.totalResults);
        this.dataSource = data.Search;
      }
    },(error) => {
      console.log(error);
      this.showLoader = false;
    })
  }

  handlePageEvent(e: PageEvent) {
    this.currentPage = e.pageIndex;
    this.searchByTitle();
  }

  loadDetailsByID(id: string) {
    this.dialog.open(MovieDetailsComponent, {
      data: id,
      maxHeight:'95%'
    });
  }

}
