<template>
  <table class="table table-striped table-bordered table-hover">
    <thead>
    <tr>
      <td>開始</td>
      <td>終了</td>
      <td>電流(mA)</td>
      <td>容量(mAh)</td>
      <td>状態</td>
    </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item._id">
        <td>{{ (new Date(item.start_time)).toFormat('YYYY/MM/DD HH24:MI:SS') }}</td>
        <td>{{ (new Date(item.end_time)).toFormat('YYYY/MM/DD HH24:MI:SS') }}</td>
        <td>{{ item.current }}</td>
        <td>{{ item.capacity }}</td>
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
      return state == 1 ? '充電中' : '終了';
    }
  },
	async created() {
		let res = await axios.get('/dashboard/charge.list');
    this.items = res.data;
    console.log(this.items);
  }
}
</script>