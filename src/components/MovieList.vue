<template>
  <div id="movie-list">
    <div v-for="movie in filteredMovies" class="movie"> {{ movie.movie.Title }} </div>
  </div>
</template>

<script>
  import genres from '../util/genres';
  export default {
      props: ['genre', 'time', 'movies'],
      methods: {
        moviePassesGenreFilter(movie) {

          if (!this.genre.length) {
            //No genre filters, return all
            return true;
          }

          /*For real api data, movie.movie.Genre is actually multiple genres (comma seperated)
            so as long as one of the entries in the movie.movie.Genre
            matches one of the items in genre, then we want to show the movie.
          */
          let movieGenres = movie.movie.Genre.split(',');
          let matches = new Set(movieGenres.filter(genre => this.genre.indexOf(genre) > -1));
          return matches.size >= 1;
        },
      },
      computed: {
        filteredMovies () {
          return this.movies.filter(this.moviePassesGenreFilter);
        }
      },
    }
</script>
