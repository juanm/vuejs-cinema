<template>
  <div id="movie-filter">
    <h2>Filter Results</h2>
    <div class="filter-group">
      <check-filter v-for="genre in genres" :key="genre.title" v-bind:title="genre" v-on:check-filter="checkFilter"></check-filter>
    </div>
  </div>
</template>

<script>
  import genres from '../util/genres';
  import CheckFilter from './CheckFilter.vue';
  export default {
      data(){
        return {
          genres
        }
      },

      methods: {
        checkFilter(category, title, checked) {
          this.$emit('check-filter', category, title, checked); //this will send the message to the parent which is the root Vue object
        },
      },
      // These are only available within movie filter and nowhere else
      components: {
        CheckFilter
      }
    }

</script>
