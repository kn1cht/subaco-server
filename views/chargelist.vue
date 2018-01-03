<template>
  <table class="table table-striped table-bordered table-hover">
    <thead>
    <tr>
        <td>ID</td>
        <td>start_time</td>
        <td>end_time</td>
        <td>current</td>
        <td>capacity</td>
    </tr>
    </thead>
    <tbody>
        <tr v-for="item in items" :key="item._id">
            <td>{{ item._id }}</td>
            <td>{{ (new Date(item.start_time)).toFormat('YYYY/MM/DD HH24:MI:SS') }}</td>
            <td>{{ (new Date(item.end_time)).toFormat('YYYY/MM/DD HH24:MI:SS') }}</td>
            <td>{{ item.current }}</td>
            <td>{{ item.capacity }}</td>
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
	async created() {
		let res = await axios.get('http://localhost:3000/dashboard/chargelist');
		this.items = res.data;
	}
}
</script>