import { Component } from '@angular/core';
import y from '../../assets/years.json';
import { Movie } from '../../models';
import { MovieService } from '../../services/movie.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  movies: any = [];
  years: string[] = y.years;

  // Pagination
  totalMovies: number = 0;
  page: number = 1;

  loader: boolean = true;

  // Search query
  query: string = window.localStorage.getItem('query') || '';

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    console.log('on init...');
    this.clearLocalStorageIfUserReload();

    this.getDataFromLocalStorage();
  }

  clearLocalStorageIfUserReload() {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('movies_data', '');
      localStorage.setItem('totalMovies', '0');
    });
  }

  getDataFromLocalStorage() {
    // Get query string from localStorage
    const storedQuery = localStorage.getItem('query');
    if (storedQuery) {
      this.query = storedQuery;
    }

    // Get page saved from localStorage
    const storedPage = parseInt(localStorage.getItem('page') || '1', 10);
    this.page = storedPage;

    // Get movies data from localStorage if available
    const storedMoviesData = localStorage.getItem('movies_data');

    // If movies data is available, load it from localStorage
    if (storedMoviesData) {
      const moviesData = JSON.parse(storedMoviesData);
      if (moviesData[this.query] && moviesData[this.query][this.page]) {
        this.movies = moviesData[this.query][this.page];
        this.totalMovies = parseInt(
          localStorage.getItem('totalMovies') || '0',
          10
        );
        this.loader = false;
      } else {
        this.fetchMovies(this.page);
      }
    } else {
      this.fetchMovies(this.page);
    }
  }

  updateQuery(event: Event) {
    event.preventDefault(); // prevent browser from reloading

    // Update the search query
    this.query = (event.target as HTMLInputElement)?.value;
    console.log((event.target as HTMLInputElement)?.value);

    // Simpan query ke localStorage
    localStorage.setItem('query', this.query);

    // Reset page to 1 for new query
    this.page = 1;
    localStorage.setItem('page', '1');
    this.searchMovies();
  }

  searchMovies() {
    // Activate the loader
    this.loader = true;
    this.page = 1;

    // Simpan query ke localStorage
    localStorage.setItem('query', this.query);

    // If the search query is empty, fetch movies from the server
    if (this.query === '') {
      console.log('query is empty...');
      this.fetchMovies();
      return;
    }

    console.log("query isn't empty...");

    // Fetch movies from the server
    try {
      this.movieService
        .searchMovies(this.query, this.page)
        .subscribe((res: any) => {
          console.log(res['Search']);
          this.movies = res['Search'];
          this.totalMovies = res['totalResults'];

          // Simpan data film ke localStorage
          this.saveMoviesToLocalStorage(this.query, this.page, this.movies);
          localStorage.setItem('totalMovies', this.totalMovies.toString());
        });
    } catch (error) {
      console.log(error);
      console.log('Failed to search movies...');
    } finally {
      setTimeout(() => {
        this.loader = false;
      }, 1400);
    }
  }

  fetchMovies(page: number = 1) {
    // Ambil data film dari localStorage jika ada
    const storedMoviesData = localStorage.getItem('movies_data');
    if (storedMoviesData) {
      const moviesData = JSON.parse(storedMoviesData);
      if (moviesData[this.query] && moviesData[this.query][page]) {
        this.movies = moviesData[this.query][page];
        this.totalMovies = parseInt(
          localStorage.getItem('totalMovies') || '0',
          10
        );
        this.loader = false;
        return;
      }
    }

    // Activate the loader
    this.loader = true;

    // Fetch movies from the server
    try {
      this.movieService.getMovies(page, this.query).subscribe((res: any) => {
        console.log(res['Search']);
        this.movies = res['Search'];
        this.totalMovies = res['totalResults'];
        console.log(res);

        // Simpan data film ke localStorage
        this.saveMoviesToLocalStorage(this.query, page, this.movies);
        localStorage.setItem('totalMovies', this.totalMovies.toString());
      });
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        this.loader = false;
      }, 1400);
    }
  }

  saveMoviesToLocalStorage(query: string, page: number, movies: any) {
    const storedMoviesData = localStorage.getItem('movies_data');
    let moviesData = storedMoviesData ? JSON.parse(storedMoviesData) : {};

    if (!moviesData[query]) {
      moviesData[query] = {};
    }

    moviesData[query][page] = movies;
    localStorage.setItem('movies_data', JSON.stringify(moviesData));
  }

  nextPage() {
    // Function to go to the next page
    this.page++;
    this.fetchMovies(this.page);
    localStorage.setItem('page', this.page.toString());
  }

  prevPage() {
    // Function to go to the previous page
    if (this.page > 1) {
      this.page--;
      this.fetchMovies(this.page);
      localStorage.setItem('page', this.page.toString());
    }
  }
}
