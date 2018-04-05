import Vue from 'vue';
import './style.scss';

import genres from './util/genres';
import MovieList from './components/MovieList.vue'
import MovieFilter from './components/MovieFilter.vue'

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
    MovieList, //Vue knows to map MovieList to movie-MovieList
    MovieFilter,
  }
});
//components allow you to create your own custom html tags in a way
//Components are sort of subclasses of Vue (mini instance of view)
