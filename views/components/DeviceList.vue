<template>
  <table class="table table-striped table-bordered table-hover">
    <thead>
    <tr>
      <td>名称</td>
      <td>最後の充電</td>
      <td>通知</td>
    </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item._id">
        <td>{{ item.name }}</td>
        <td>{{ getTerm(item.last_charge) }}</td>
        <td>{{ item.alert_enabled ? 'オン' : 'オフ' }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
const axios = require('axios');

export default {
  data() {
    return {
			items : []
    }
  },
  methods: {
    getTerm(date) {
      let secDiff = Math.floor((new Date() - new Date(date)) / 1000);
      if(secDiff < 0) { return 'error'; }
      let minDiff = Math.floor(secDiff / 60);
      if(minDiff === 0) { return `${secDiff}秒前`; }
      secDiff -= minDiff * 60;
      let hourDiff = Math.floor(minDiff / 60);
      if(hourDiff === 0) { return `${minDiff}分${secDiff}秒前`; }
      minDiff -= hourDiff * 60;
      const dayDiff = Math.floor(hourDiff / 24);
      if(dayDiff === 0) { return `${hourDiff}時間${minDiff}分前`; }
      hourDiff -= dayDiff * 24;
      return `${dayDiff}日${hourDiff}時間前`;
    }
  },
	async created() {
		let res = await axios.get('/api/device/list');
    this.items = res.data.list;
  }
}
</script>