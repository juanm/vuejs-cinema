<template>
  <div id="movie-list">
    <movie-item v-for="movie in filteredMovies" v-bind:movie="movie.movie"> </movie-item>
  </div>
</template>

<script>
  import genres from '../util/genres';
  import MovieItem from './MovieItem.vue';
  export default {
      props: ['genre', 'time', 'movies'],
      components: {
        MovieItem
      },
      methods: {
        moviePassesGenreFilter(movie) {

          if (!this.genre.length) {
            //No genre filters, return all
            return true;
          }
         let movieGenres = movie.movie.Genre.split(', ');

          let matched = true;
          this.genre.forEach(genre => {
            if (movieGenres.indexOf(genre) === -1) {
              matched = false;
            }
          });

          return matched;
        },
      },
      computed: {
        filteredMovies () {
          return this.movies.filter(this.moviePassesGenreFilter);
        }
      },
    }
</script>
