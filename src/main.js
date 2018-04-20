import Vue from 'vue';
import './style.scss';

import genres from './util/genres';

import VueResource from 'vue-resource';
Vue.use(VueResource);

import moment from 'moment-timezone';
moment.tz.setDefault('UTC'); //overwrite browser timezone (server in UTC)
//make it available in any component, the $ is convention
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } });

import { checkFilter, setDay} from './util/bus';

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
    this.$bus.$on('set-day', setDay.bind(this));

  },
  router
});

import { addClass, removeClass } from './util/helpers';
let mouseOverHandler = function (event) {
  let tooltip = event.target.nextSibling;
  addClass(tooltip, 'tooltip-show');
};

let mouseOutHandler = function (event) {
  let tooltip = event.target.nextSibling;
  removeClass(tooltip, 'tooltip-show');
};

Vue.directive('tooltip', {

  bind(el, bindings) {
      console.log('el');
      let span = document.createElement('SPAN');
      let text = document.createTextNode('Seats available: 200');
      span.appendChild(text);
      addClass(span, 'tooltip');
      el.appendChild(span);

      let div = el.getElementsByTagName('DIV')[0];
      div.addEventListener('mouseover', mouseOverHandler);
      div.addEventListener('mouseout', mouseOutHandler);
      div.addEventListener('touchStart', mouseOverHandler);
      div.addEventListener('touchend', mouseOutHandler);
  },

  unbind(el) {
    let div = el.getElementsByTagName('DIV')[0];
    div.removeEventListener('mouseover', mouseOverHandler);
    div.removeEventListener('mouseout', mouseOutHandler);
    div.removeEventListener('touchStart', mouseOverHandler);
    div.removeEventListener('touchend', mouseOutHandler);
  }

});

//components allow you to create your own custom html tags in a way
//Components are sort of subclasses of Vue (mini instance of view)
