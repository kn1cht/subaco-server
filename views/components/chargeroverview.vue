<template>
  <div class="row">
    <div class="col-sm-2" v-for="item in items" :key="item._id">
      <charger-soc-graph :soc="soc(item.residual, item.capacity)" :name="item.name"></charger-soc-graph>
    </div>
  </div>
</template>
 
<script>
import axios from 'axios';
import ChargerSocGraph from './chargersocgraph.vue';

export default {
  data() { return { items : [] }},
  components : {
    'charger-soc-graph' : ChargerSocGraph,
  },
  methods    : {
    soc(residual, capacity) {
      const percentage = residual / capacity * 100;
      return Math.max( Math.min(percentage, 100), 0).toFixed(2);
    }
  },
	async created() {
		let res = await axios.get('/api/charger/list');
    this.items = res.data;
  },
}
</script>