
import { addClass, removeClass } from './helpers';
let mouseOverHandler = function (event) {
  let tooltip = event.target.nextSibling;
  addClass(tooltip, 'tooltip-show');
};

let mouseOutHandler = function (event) {
  let tooltip = event.target.nextSibling;
  removeClass(tooltip, 'tooltip-show');
};

export default {
  install(Vue) {
    Vue.directive('tooltip', {

      bind(el, bindings) {
  
          let span = document.createElement('SPAN');
          let text = document.createTextNode(`Seats available: ${bindings.value.seats}`);
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
  }
}
