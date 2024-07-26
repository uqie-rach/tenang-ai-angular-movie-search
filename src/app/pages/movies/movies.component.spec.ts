import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MovieService } from '../../services/movie.service';
import { MoviesComponent } from './movies.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let movieService: MovieService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesComponent],
      providers: [
        MovieService,
        { provide: 'LOCAL_STORAGE', useValue: window.localStorage },
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(routes)
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService);
  
    fixture.detectChanges();
  });

  it('should render movies page', () => {
    expect(component).toBeTruthy();
  });

  it('should define getMovies instance', () => {
    component.ngOnInit();
    expect(movieService.getMovies).toBeInstanceOf(Function);
    expect(movieService.getMovies).toBeDefined();
  });

  it('should define clearLocalStorageIfUserReload instance', () => {
    component.ngOnInit();
    expect(component.clearLocalStorageIfUserReload).toBeInstanceOf(Function);
    expect(component.clearLocalStorageIfUserReload).toBeDefined();
  });
});
