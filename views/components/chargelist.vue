<template>
  <table class="table table-striped table-bordered table-hover">
    <thead>
    <tr>
      <td>開始</td>
      <td>終了</td>
      <td>充電器名</td>
      <td>端末名</td>
      <td>電流(mA)</td>
      <td>容量(mAh)</td>
      <td>状態</td>
    </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item._id">
        <td>{{ (new Date(item.start_time)).toFormat('YYYY/MM/DD HH24:MI:SS') }}</td>
        <td>{{ item.state ? '-' : (new Date(item.update_time)).toFormat('YYYY/MM/DD HH24:MI:SS') }}</td>
        <td>{{ item.charger_id.name }}</td>
        <td>{{ item.device_id.name }}</td>
        <td>{{ item.current.toFixed(2) }}</td>
        <td>{{ item.capacity.toFixed(2) }}</td>
        <td>{{ getState(item.state) }}</td>
      </tr>
    </tbody>
  </table>
</template>
 
<script>
const axios = require('axios');
require('date-utils');

export default {
  data() {
    return {
			items : []
    }
  },
  methods: {
    getState(state) {
      return state == 0 ? '終了' : '充電中';
    }
  },
	async created() {
		let res = await axios.get('/api/charge.list');
    this.items = res.data;
  }
}
</script>