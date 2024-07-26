import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Movie,
  MovieDetailResponse,
  MovieSearchResponse,
} from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apikey = '670d0a5a';
  private apiUrl = `http://www.omdbapi.com/?apikey=${this.apikey}`;

  constructor(private http: HttpClient) {}

  getMovies(page?: number, query?: string): Observable<MovieSearchResponse> {
    return this.http.get<MovieSearchResponse>(
      `${this.apiUrl}&s=${query || 'hero'}&type=movie&page=${page}`
    );
  }

  getComments(limit: number) {
    return this.http.get(
      `https://jsonplaceholder.typicode.com/comments?limit=${limit}`
    );
  }

  searchMovies(
    query: string,
    page: number = 1
  ): Observable<MovieSearchResponse> {
    return this.http.get<MovieSearchResponse>(
      `${this.apiUrl}&s=${query}&page=${page}`
    );
  }

  getMovieDetails(id: string): Observable<MovieDetailResponse> {
    return this.http.get<MovieDetailResponse>(`${this.apiUrl}&i=${id}`);
  }
}
