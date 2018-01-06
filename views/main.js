/*** Webpack build entry point ***/

const Vue = require('vue');
const ChargeList = require('./chargelist.vue').default;
const ChargerList = require('./chargerlist.vue').default;
const DeviceList = require('./devicelist.vue').default;
require('bootstrap');

window.onload = () => {
  new Vue({
    el     : '#charge-list',
    render : createElement => createElement(ChargeList)
  });
  new Vue({
    el     : '#charger-list',
    render : createElement => createElement(ChargerList)
  });
  new Vue({
    el     : '#device-list',
    render : createElement => createElement(DeviceList)
  });
};