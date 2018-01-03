const Vue = require('vue');
const ChargeList = require('./chargelist.vue').default;

window.onload = () => {
  const chargeList = new Vue({
    el     : '#charge-list',
    render : h => h(ChargeList)
  });
}
