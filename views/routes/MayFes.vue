<template>
  <section class="container">
    <div>
      <UserName></UserName>
    </div>
    <div class = "content">
      <div class="panel panel-info">
        <ActiveCharger class="panel-body"></ActiveCharger>
      </div>
      <div class="panel panel-info">
        <ul class="panel-body">
          <li>{{ elapsedTime }}</li>
          <li>{{ latest.current.toFixed(0) }} mA</li>
        </ul>
      </div>
      <div class="panel panel-info">
        <DeviceCharged class="panel-body"></DeviceCharged>
      </div>

    </div>
  </section>
</template>

<style scoped>
div.content {
  display: flex;
  flex: 1 0 auto;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>

<script>
const axios = require('axios');
import ActiveCharger from '../components/ActiveCharger.vue';
import DeviceCharged from '../components/DeviceCharged.vue';
import UserName from '../components/UserName.vue';
require('date-utils');

export default {
  data() {
    return {
      currentTime : 0,
      items       : [],
      latest      : {}
    }
  },
  components : {
    ActiveCharger,
    DeviceCharged,
    UserName
  },
  computed: {
    elapsedTime () {
      let secDiff = Math.floor((this.currentTime - new Date(this.latest.start_time)) / 1000);
      if(secDiff < 0) { return 'error'; }
      let minDiff = Math.floor(secDiff / 60);
      secDiff -= minDiff * 60;
      let hourDiff = Math.floor(minDiff / 60);
      minDiff -= hourDiff * 60;
      const dayDiff = Math.floor(hourDiff / 24);
      hourDiff -= dayDiff * 24;
      if(dayDiff === 0) { return `${hourDiff}:${minDiff}:${secDiff}`; }
      else { return `${dayDiff}:${hourDiff}:${minDiff}:${secDiff}`; }
    }
  },
	async created() {
		let res = await axios.get('/api/charge/list');
    this.items = res.data.list;
    this.latest = this.items[0];

    const self = this;
    (function timerLoop() {
      self.currentTime = Math.floor(new Date);
      requestAnimationFrame(timerLoop);
    }());
  }
}
</script>
