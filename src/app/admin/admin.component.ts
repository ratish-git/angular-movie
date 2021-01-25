import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';
import { Movie } from '../movie';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ApiService],
})
export class AdminComponent implements OnInit {
  addMovie!: FormGroup;
  submitted = false;
  public movies!: Movie[];
  constructor(
    private authService: AuthService,
    private router: Router,
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.getAllMovies();
  }

  ngOnInit() {
    this.addMovie = this.formBuilder.group({
      movieName: ['', Validators.required],
      movieCategory: ['', Validators.required],
      movieRating: ['', Validators.required],
      movieReleaseDate: ['', Validators.required],
      movieBudget: ['', Validators.required],
    });
  }

  getAllMovies() {
    this.apiService.getAllMovies().then(
      (movies) => {
        this.movies = movies;
        console.log(movies);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  get f() {
    return this.addMovie.controls;
  }

  addMoviee() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addMovie.invalid) {
      return;
    }
    console.log('movieName..' + this.f['movieName'].value);
    let movieName = this.f['movieName'].value;
    let movieCategory = this.f['movieCategory'].value;
    let movieRating = this.f['movieRating'].value;
    let movieReleaseDate = this.f['movieReleaseDate'].value;
    let movieBudget = this.f['movieBudget'].value;
    let movie = new Movie(
      movieName,
      movieCategory,
      movieRating,
      movieReleaseDate,
      movieBudget
    );
    this.apiService.addMovie(movie).then(
      (movies) => {
        this.movies = movies;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editMovie(movie: Movie): void {
    this.router.navigateByUrl('/editMovie');
  };

  deleteMovie(movie: Movie) {
    this.apiService.deleteMovieByName(movie.movieName).then(
      (movies) => {
        this.movies = movies;
      },
      (err) => {
        console.log(err);
      }
    );
    
  }
}
