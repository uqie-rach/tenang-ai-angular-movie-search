import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailComponent } from './movie-detail.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from '../../app.routes';
import { provideRouter } from '@angular/router';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetailComponent],
      providers: [provideRouter(routes), provideHttpClient(withInterceptorsFromDi())]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
