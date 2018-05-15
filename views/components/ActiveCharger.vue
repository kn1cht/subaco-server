<template>
  <ul>
    <li>{{ activeCharger.manufacturer || 'Unknown' }}</li>
    <li>{{ activeCharger.name || 'Unknown' }}</li>
    <li>{{ activeCharger.residual }}</li>
    <li>{{ activeCharger.capacity }}</li>
  </ul>
</template>

<script>
const axios = require('axios');

export default {
  data() { return { activeCharger : {} }},
	async created() {
    const res = await axios.get('/api/user/activeCharger');
    this.activeCharger = res.data.charger;
  }
}
</script>
