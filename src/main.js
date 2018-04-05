import Vue from 'vue';
import './style.scss';

import genres from './util/genres';

new Vue({
  el: '#app',
  data: {
    genre:[],
    time:[]
  },
  methods: {
    checkFilter(category, title, checked) {
      console.log("Root Instance checkFilter");
      console.log(category, title, checked);
      //Add or remove the filter to the genre filter array
      if (checked) {
        //Category could be genre or time, so this[genre] or this[time]
        this[category].push(title);
      } else {
        let index = this[category].indexOf(title);
        if (index > -1) {
          this[category].splice(index, 1);
        }
      }
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
        checkFilter(category, title, checked) {
          console.log('Movie Filter: checkFilter');
          this.$emit('check-filter', category, title, checked); //this will send the message to the parent which is the root Vue object
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
                //event name, following arguments is arbitrary number of payload (type of filter, title, state checked or not)
                this.$emit('check-filter', 'genre', this.title, this.checked);
              }
            }
        }
      }
    }
  }
});
//components allow you to create your own custom html tags in a way
//Components are sort of subclasses of Vue (mini instance of view)
