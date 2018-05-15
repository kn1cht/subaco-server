<template>
  <ul>
    <li>{{ (new Date(latest.start_time)).toFormat('YYYY/MM/DD HH24:MI:SS') }}</li>
    <li>{{ latest.state ? '-' : (new Date(latest.update_time)).toFormat('YYYY/MM/DD HH24:MI:SS') }}</li>
    <li>{{ latest.device_id.manufacturer || 'Unknown' }}</li>
    <li>{{ latest.device_id.name || 'Unknown' }}</li>
  </ul>
</template>

<script>
const axios = require('axios');
require('date-utils');

export default {
  data() {
    return {
      items  : [],
      latest : {}
    }
  },
  methods: {},
	async created() {
		let res = await axios.get('/api/charge/list');
    this.items = res.data.list;
    this.latest = this.items[0];
  }
}
</script>
