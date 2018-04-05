<template>
  <div id="movie-filter">
    <h2>Filter Results</h2>
    <h3>By time of day</h3>
    <div class="filter-group">
      <check-filter v-for="time in times" category="time" v-bind:title="time" v-on:check-filter="checkFilter"></check-filter>
    </div>
    <h3>By genre</h3>
    <div class="filter-group">
      <check-filter v-for="genre in genres" category="genre" :key="genre.title" v-bind:title="genre" v-on:check-filter="checkFilter"></check-filter>
    </div>
  </div>
</template>

<script>
  import genres from '../util/genres';
  import times from '../util/times';
  import CheckFilter from './CheckFilter.vue';
  export default {
      data(){
        return {
          genres,
          times
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
