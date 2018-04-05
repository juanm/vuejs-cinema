import Vue from 'vue';
import './style.scss';

import genres from './util/genres';

new Vue({
  el: '#app',
  methods: {
    checkFilter() {
      console.log("Root Instance checkFilter");
    }
  },
  components: {
    'movie-list': {
      template: `<div id="movie-list">
                  <div v-for="movie in movies" class="movie"> {{ movie.title }} </div>
                </div>`,
      data: function (){
        return {
            movies: [
              {title: 'pulp fiction'},
              {title: 'Home alone'},
              {title: 'Austin Power'}
            ]
          }
      }
    },
    'movie-filter': {
      data(){
        return {
          genres
        }
      },
      template: `<div id="movie-filter">
                    <h2>Filter Results</h2>
                    <div class="filter-group">
                      <check-filter v-for="genre in genres" :key="genre.title" v-bind:title="genre" v-on:check-filter="checkFilter"></check-filter>
                    </div>
                 </div>`,
      methods: {
        checkFilter() {
          console.log('Movie Filter: checkFilter)');
          this.$emit('check-filter'); //this will send the message to the parent which is the root Vue object
        },
      },
       // These are only available within movie filter and nowhere else
      components: {
        'check-filter': {
            data() {
              return {
                checked: false
              }
            },
            template: `<div v-bind:class="{ 'check-filter': true, active: checked }" v-on:click="checkFilter">
                          <span class="checkbox"></span>
                          <span clas="check-filter-title">{{ title }}</span>
                      </div>`,
            props: ['title'],
            methods: {
              checkFilter() {
                this.checked = !this.checked;
                this.$emit('check-filter');
              }
            }
        }
      }
    }
  }
});
//components allow you to create your own custom html tags in a way
//Components are sort of subclasses of Vue (mini instance of view)
