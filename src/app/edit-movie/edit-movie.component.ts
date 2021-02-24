import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css'],
})
export class EditMovieComponent implements OnInit {
  movieNamefromStorage!: String;
  editForm!: FormGroup;
  public movies!: Movie[];
  // movieNamefromStorage!:String; 
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {
   // const movieNamefromStorage = JSON.stringify(localStorage.getItem('editMovie') || '{}');

  }

  ngOnInit() {
    const movieNamefromStorage = JSON.stringify(localStorage.getItem('editMovie') || '{}');
    this.editForm = this.formBuilder.group({
      movieName: ['', Validators.required],
      movieCategory: ['', Validators.required],
      movieRating: ['', Validators.required],
      movieReleaseDate: ['', Validators.required],
      movieBudget: ['', Validators.required],
    });
   // console.log(this.apiService.getMovieByName(movieNamefromStorage));
    this.getMoviedByName(movieNamefromStorage);
   
  }

  getMoviedByName(movieNamefromStorage:string) {
    console.log("fromS"+movieNamefromStorage)
    this.apiService.getMovieByName(movieNamefromStorage).then(
      (movies) => {
        this.movies = movies;
        console.log(movies);
      },
      (err) => {
        console.log(err);
      }
    );
  }

    // this.apiService.getMovieByName(movieNamefromStorage)
    //   .subscribe(
    //     data => {
    //       console.log(data.body);
    //     },
    //     error => {
    //       console.log(error);
    //     });
  //}
}
