<template>
  <div>
    <p>{{ activeCharger.manufacturer || '製造元不明' }}</p>
    <p>{{ activeCharger.name || '名称不明' }}</p>
    <p>{{ activeCharger.residual }}</p>
    <p>{{ activeCharger.capacity }}</p>
  </div>
</template>

<style scoped>
p {
  font-size: 30px;
}
</style>

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
