import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movie } from './movie';
import { User } from '../app/user';
import { Observable } from 'rxjs';
import { UserR } from './userR';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiURL: string = 'http://localhost:8080/user';
  constructor(private httpClient: HttpClient) {}

  logSomeMessage(msg: any) {
    console.log('Message from consumer is : ' + msg);
  }

  private readonly movieURL = 'http://localhost:8080/user/getAllMovies';
  getAllMovies(): Promise<Array<Movie>> {
    return this.httpClient
      .get(this.movieURL)
      .toPromise()
      .then((response) => response as Movie[])
      .catch(this.handleError);
  }

  private readonly addMovieUrl = 'http://localhost:8080/user/addMovie';
  addMovie(movie: Movie): Promise<Array<Movie>> {
    const mv = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient
      .post(this.addMovieUrl, JSON.stringify(movie), { headers: mv })
      .toPromise()
      .then((response) => response as Movie[])
      .catch(this.handleError);
  }

  private readonly addUserUrl = 'http://localhost:8080/user/addUser';
  addUser(user: UserR): Promise<Array<UserR>> {
    const mv = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient
      .post(this.addUserUrl, JSON.stringify(user), { headers: mv })
      .toPromise()
      .then((response) => response as UserR[])
      .catch(this.handleError);
  }

  private readonly apiUrl = 'http://localhost:8080/user/deleteMovie';
  deleteMovieByName(name: string): Promise<Array<Movie>> {
    const url = `${this.apiUrl}/${name}`;
    return this.httpClient
      .delete(url)
      .toPromise()
      .then((response) => response as Movie[])
      .catch(this.handleError);
  }

  private readonly adminUsers = 'http://localhost:8080/user/getAdminUser';
  getAdminUsers(email: string): Promise<Array<User>> {
    const url = `${this.adminUsers}/${email}`;
    return this.httpClient
      .get(this.adminUsers)
      .toPromise()
      .then((response) => response as User[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<Array<any>> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
