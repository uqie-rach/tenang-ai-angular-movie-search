import { Routes } from '@angular/router';
import {
  MoviesComponent,
  PageNotFoundComponent,
  HomeComponent,
  MovieDetailComponent,
} from './pages/';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/:imdbId', component: MovieDetailComponent },
  { path: '**', component: PageNotFoundComponent },
];
