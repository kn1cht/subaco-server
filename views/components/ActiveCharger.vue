<template>
  <div>
    <p><small>{{ activeCharger.manufacturer || '製造元不明' }}</small></p>
    <p>{{ activeCharger.name || '名称不明' }}</p>
      <ChargerSocGraph :residual="activeCharger.residual" :capacity="activeCharger.capacity" :option="this.socOption"></ChargerSocGraph>
    <p>
      <small>推定残量</small><br>
      {{ activeCharger.residual.toFixed(0) }} / {{ activeCharger.capacity }} mAh
    </p>
  </div>
</template>

<style scoped>
p {
  font-size: 30px;
}
p small {
  font-size: 20px;
}
</style>

<script>
const axios = require('axios');
import ChargerSocGraph from './ChargerSocGraph.vue';

export default {
  data() { return {
    activeCharger : {},
    socOption     : {
      backgroundBorderWidth : 15,
      percentageTextSize    : 30,
      percentageY           : 120
    }
  }},
  components : { ChargerSocGraph },
  methods    : {},
	async created() {
    const res = await axios.get('/api/user/activeCharger');
    this.activeCharger = res.data.charger;
  }
}
</script>
