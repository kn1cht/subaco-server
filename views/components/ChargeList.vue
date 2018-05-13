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
        <td>削除</td>
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
          <td>{{ genStateStr(item.state) }}</td>
          <td>
            <button class="btn btn-xs btn-danger" @click="deleteId=item._id">
              <i class="fa fa-fw fa-times-circle" aria-hidden="true"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="panel-footer">
      <button class="btn btn-primary" @click="createFlag=true">
        <i class="fa fa-fw fa-plus" aria-hidden="true"></i>新規
      </button>
    </div>
    <ChargeDelete :delete-id="deleteId" @close="deleteId=null" @chargeDeleteDone="delCharge"></ChargeDelete>
    <ChargeCreate :create-flag="createFlag" @close="createFlag=false" @chargeDeleteDone="getCharge"></ChargeCreate>
    <modal></modal>
  </div>
</template>

<script>
import ChargeCreate from '../components/ChargeCreate.vue';
import ChargeDelete from '../components/ChargeDelete.vue';
const axios = require('axios');
require('date-utils');

export default {
  data() {
    return {
      items      : [],
      deleteId   : null,
      createFlag : false
    }
  },
  components : { ChargeCreate, ChargeDelete },
  methods: {
    delCharge() {
      this.items = this.items.filter((val) => { return (val._id !== this.deleteId); });
      this.deleteId = null;
    },
    genStateStr(state) {
      return state == 0 ? '終了' : '充電中';
    }
  },
	async created() {
		let res = await axios.get('/api/charge/list');
    this.items = res.data.list;
  }
}
</script>