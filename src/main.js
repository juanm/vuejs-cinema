import Vue from 'vue';
import './style.scss';

import genres from './util/genres';

import VueResource from 'vue-resource';
Vue.use(VueResource);

import moment from 'moment-timezone';
moment.tz.setDefault('UTC'); //overwrite browser timezone (server in UTC)
//make it available in any component, the $ is convention
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } });

import { checkFilter } from './util/bus';

const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus } });

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import routes from './util/routes';

const router = new VueRouter({
  routes
});

new Vue({
  el: '#app',
  data: {
    movies:[],
    genre:[],
    time:[],
    moment,
    day: moment(),
    bus
  },

  created() {
    this.$http.get('/api').then(response => {
      this.movies = response.data;
    });

    this.$bus.$on('check-filter', checkFilter.bind(this));

  },
  router
});
//components allow you to create your own custom html tags in a way
//Components are sort of subclasses of Vue (mini instance of view)
