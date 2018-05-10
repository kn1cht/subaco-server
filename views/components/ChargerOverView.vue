<template>
  <div class="row">
    <div :class="colSize" v-for="item in items" :key="item._id">
      <ChargerSocGraph :soc="soc(item.residual, item.capacity)" :name="item.name"></ChargerSocGraph>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ChargerSocGraph from './ChargerSocGraph.vue';

export default {
  data() {
    return {
      items : [],
      colSize : 3
    }
  },
  components : { ChargerSocGraph },
  methods    : {
    soc(residual, capacity) {
      const percentage = residual / capacity * 100;
      return Math.max( Math.min(percentage, 100), 0).toFixed(2);
    }
  },
	async created() {
		let res = await axios.get('/api/charger/list');
    this.items = res.data;
    this.colSize = `col-xs-${Math.max(Math.floor(12 / this.items.length), this.colSize)}`;
  }
}
</script>