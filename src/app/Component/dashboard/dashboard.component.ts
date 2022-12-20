import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/Model/movie';
import { DataService } from 'src/app/Service/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  latestMovie: any;
  popularMovies!: Movie;
  nowplayingMovies!: Movie;
  topRatedMovies!: Movie;
  upcomingMovies!: Movie;
  trendingMovies!: Movie;
  originals!: Movie;
  // popularMovies!: Movie;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getLatestMovie();
    this.getPopularMovie();
    this.getNowPlayingMovie();
    this.getTopRatedMovie();
    this.getTrendingMovie();
    this.getOriginals();
    this.getUpcomingMovie();
  }

  getLatestMovie() {
    this.dataService.getLatestMovie().subscribe(res => {
      this.latestMovie = this.changeData(res);
      console.log(this.latestMovie);
    }, err => {
      console.log(err)
    })
  }

  changeData(res: any): any {
    if(!res.backdrop_path) {
      res.backdrop_path = 'https://image.tmdb.org/t/p/original'+res.poster_path+'?api_key='+environment.api_key;
    }else {
      res.backdrop_path = 'https://image.tmdb.org/t/p/original'+res.backdrop_path+'?api_key='+environment.api_key;
    }

    return res;
  }

  getPopularMovie() {
    this.dataService.getPopularMovies().subscribe(res => {
      this.popularMovies = this.modifyData(res);
      // console.log(this.popularMovies)
    }, err => {
      console.log(err)
    })
  }

  getNowPlayingMovie() {
    this.dataService.getNowPlayingMovies().subscribe(res => {
      this.nowplayingMovies = this.modifyData(res);
      // console.log(this.nowplayingMovies)
    }, err => {
      console.log(err)
    })
  }

  getTopRatedMovie() {
    this.dataService.getTopRatedMovies().subscribe(res => {
      this.topRatedMovies = this.modifyData(res);
      // console.log(this.topRatedMovies)
    }, err => {
      console.log(err)
    })
  }

  getUpcomingMovie() {
    this.dataService.getUpcomingMovies().subscribe(res => {
      this.upcomingMovies = this.modifyData(res);
      // console.log(this.upcomingMovies)
    }, err => {
      console.log(err)
    })
  }

  getTrendingMovie() {
    this.dataService.getTrendingMovies().subscribe(res => {
      this.trendingMovies = this.modifyData(res);
      // console.log(this.trendingMovies)
    }, err => {
      console.log(err)
    })
  }

  getOriginals() {
    this.dataService.getOriginals().subscribe(res => {
      this.originals = this.modifyData(res);
      // console.log(this.originals)
    }, err => {
      console.log(err)
    })
  }

  modifyData(movies: Movie): Movie {
    if(movies.results) {
      movies.results.forEach((element: { backdrop_path: string; title: any; name: any; })=> {
        element.backdrop_path = 'https://image.tmdb.org/t/p/original'+element.backdrop_path+'?api_key='+environment.api_key;
        if(!element.title) {
          element.title = element?.name;
        }
      });
    }
    return movies;
  }
}
