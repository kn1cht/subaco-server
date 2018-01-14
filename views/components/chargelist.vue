<template>
  <div>
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
        <td></td>
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
          <td>
            <button class="btn btn-xs btn-danger" @click="id=item._id">
              <i class="fa fa-fw fa-times-circle" aria-hidden="true"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="panel-footer">
      <button class="btn btn-primary" @click="create=true">
        <i class="fa fa-fw fa-plus" aria-hidden="true"></i>新規
      </button>
    </div>
    <charge-delete :id="id" @close="id=null" @chargeDeleteDone="delCharge"></charge-delete>
    <charge-create :create="create" @close="create=false" @chargeDeleteDone="getCharge"></charge-create>
  </div>
</template>
 
<script>
import ChargeCreate from '../components/chargecreate.vue';
import ChargeDelete from '../components/chargedelete.vue';
const axios = require('axios');
require('date-utils');

export default {
  data() {
    return {
      items  : [],
      id     : null,
      create : false
    }
  },
  components : {
    'charge-create' : ChargeCreate,
    'charge-delete' : ChargeDelete
  },
  methods: {
    delCharge() {
      this.items = this.items.filter((val) => { return (val._id !== this.id); });
      this.id = null;
    },
    getState(state) {
      return state == 0 ? '終了' : '充電中';
    }
  },
	async created() {
		let res = await axios.get('/api/charge/list');
    this.items = res.data;
  }
}
</script>