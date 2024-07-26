import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

// icons
import {
  heroArrowLeft,
  heroArrowRight,
  heroCalendar,
  heroFilm,
  heroHandThumbUp,
  heroLanguage,
  heroPlus,
  heroSquares2x2,
  heroStar,
  heroTrophy,
} from '@ng-icons/heroicons/outline';
import { heroPlaySolid } from '@ng-icons/heroicons/solid';

import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [NgIconComponent],
  viewProviders: [
    provideIcons({
      heroCalendar,
      heroPlaySolid,
      heroPlus,
      heroHandThumbUp,
      heroLanguage,
      heroStar,
      heroSquares2x2,
      heroArrowRight,
      heroArrowLeft,
      heroFilm,
      heroTrophy,
    }),
  ],
  templateUrl: './movie-detail.component.html',
})
export class MovieDetailComponent implements OnInit {
  protected imdbId = '';
  protected movie: Movie | any = {};

  loader: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {
    this.route.params.subscribe((params) => {
      this.imdbId = params['imdbId'];
    });
  }

  /**
   * lifecycle hooks
   */
  ngOnInit(): void {
    this.fetchMovieDetail();
  }

  /**
   * Functions block
   */
  fetchMovieDetail(): void {
    try {
      // activate loader
      this.loader = true;

      // fetch movie detail
      this.movieService.getMovieDetails(this.imdbId).subscribe((response) => {
        this.movie = response;
      });

    } catch (error) {
      console.error('Error fetching movie detail', error);
    } finally {
      setTimeout(() => {
        // deactivate loader
        this.loader = false;
      }, 1200);
    }
  }

  getMovieAttributes(type: string): string[] {
    switch (type) {
      case 'genre':
        return this.movie?.Genre?.split(', ');
      case 'director':
        return this.movie?.Director?.split(', ');
      case 'writer':
        return this.movie?.Writer?.split(', ');
      case 'actors':
        return this.movie?.Actors?.split(', ');
      default:
        return [];
    }
  }

  generateTextSkeleton(): string[] {
    return Array(3).fill('');
  }
}
