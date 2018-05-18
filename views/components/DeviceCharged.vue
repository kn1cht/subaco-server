<template>
  <div>
    <p>{{ latest.device_id.manufacturer || '製造元不明' }}</p>
    <p class="large">{{ latest.device_id.name || '名称不明' }}</p>
    <hr>
    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <td colspan="2">履歴</td>
      </tr>
      </thead>
      <tbody>
        <tr v-for="item in items.slice(0, 8)" :key="item._id">
          <td>{{ item.device_id.name }}</td>
          <td>{{ formatTimeDiff(calcSecDiff(item.update_time, item.start_time)) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
div {
  border: solid 1px #ddd;
  padding: 14px;
}
p {
  font-size: 20px;
}
p.large {
  font-size: 30px;
}
table {
  font-size: 18px;
  margin: 0px;
}
.table-striped>tbody>tr:nth-of-type(odd) {
  background-color: #666;
}
.table-striped>tbody>tr:hover {
  background-color: #33444e;
}
</style>

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
  methods: {
    calcSecDiff(t1, t2) {
      return Math.floor((new Date(t1) - new Date(t2)) / 1000);
    },
    async fetchCharge() {
		let res = await axios.get('/api/charge/list');
    this.items = res.data.list;
    this.latest = this.items[0];
    },
    formatTimeDiff(secDiff) {
      if(secDiff < 0) { return 'error'; }
      let minDiff = Math.floor(secDiff / 60);
      secDiff -= minDiff * 60;
      let hourDiff = Math.floor(minDiff / 60);
      minDiff -= hourDiff * 60;
      const dayDiff = Math.floor(hourDiff / 24);
      hourDiff -= dayDiff * 24;
      if(hourDiff === 0) { return `${minDiff}分${secDiff}秒`; }
      if(dayDiff === 0) { return `${hourDiff}時間${minDiff}分${secDiff}秒`; }
      else { return `${dayDiff}日${hourDiff}時間${minDiff}分`; }
    }
  },
	async created() {
    await this.fetchCharge();
  }
}
</script>
