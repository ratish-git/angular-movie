import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Movie } from '../movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ApiService],
})
export class HomeComponent implements OnInit {
  public movies!: Movie[];
  constructor(private apiService: ApiService) {
    this.apiService.logSomeMessage('Hi from HOMeComponent !');
    this.getAllMovies();
  }
  getAllMovies() {
    this.apiService.getAllMovies().then(
      (movies) => {
        this.movies = movies;
        console.log(movies)
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.getAllMovies;
  }
}
