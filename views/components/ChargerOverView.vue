<template>
  <div class="row">
    <div :class="colSize" v-for="item in items" :key="item._id">
      <ChargerSocGraph :residual="item.residual" :capacity="item.capacity" :option="{text:item.name}"></ChargerSocGraph>
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
  methods    : {},
	async created() {
		let res = await axios.get('/api/charger/list');
    this.items = res.data.list;
    this.colSize = `col-xs-${Math.max(Math.floor(12 / this.items.length), this.colSize)}`;
  }
}
</script>