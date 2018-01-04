/*** Webpack build entry point ***/

const Vue = require('vue');
const ChargeList = require('./chargelist.vue').default;

window.onload = () => {
  new Vue({
    el     : '#charge-list',
    render : createElement => createElement(ChargeList)
  });
};