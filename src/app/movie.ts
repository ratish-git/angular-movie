export class Movie {
  id!: string;
  movieName!: string;
  movieCategory!: string;
  movieRating!: string;
  movieReleaseDate!: string;
  movieBudget!: string;
  constructor(
    movieName: string,
    movieCategory: string,
    movieRating: string,
    movieReleaseDate: string,
    movieBudget: string
  ) {
    this.movieName = movieName;
    this.movieCategory = movieCategory;
    this.movieRating = movieRating;
    this.movieReleaseDate = movieReleaseDate;
    this.movieBudget = movieBudget;
  }
}
