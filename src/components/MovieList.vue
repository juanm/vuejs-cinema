<template>
  <div id="movie-list">
    <div v-for="movie in filteredMovies" class="movie"> {{ movie.title }} </div>
  </div>
</template>

<script>
  import genres from '../util/genres';
  export default {
      data: function (){
        return {
            movies: [
              {title: 'pulp fiction', genre: genres.CRIME},
              {title: 'Home alone', genre: genres.COMEDY},
              {title: 'Austin Power', genre: genres.COMEDY}
            ]
          }
      },
      props: ['genre', 'time'],
      methods: {
        moviePassesGenreFilter(movie) {

          if (!this.genre.length) {
            //No genre filters, return all
            return true;
          }
          return this.genre.find(genre => movie.genre === genre);
        },
      },
      computed: {
        filteredMovies () {
          return this.movies.filter(this.moviePassesGenreFilter);
        }
      },
    }
</script>
