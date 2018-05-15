<template>
  <section>
    <div class = "content">
      <div class="panel panel-info">
        <ActiveCharger class="panel-body"></ActiveCharger>
      </div>
      <div class="panel panel-info">
        <p>
          <small>経過時間</small><br>
          {{ formatTimeDiff(elapsedTime) }}
        </p>
        <p>
          <small>電流(平均)</small><br>
          {{ currentmA }} mA
        </p>
      </div>
      <div class="panel panel-info">
        <DeviceCharged class="panel-body"></DeviceCharged>
      </div>

    </div>
  </section>
</template>

<style scoped>
p {
  font-size: 50px;
}
p small {
  font-size: 30px;
}
div.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 5vw;
}
div.panel {
  flex: 1 0 auto;
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
      nowTime   : 0,
      currentmA : 0,
      items     : [],
      latest    : {}
    }
  },
  components : {
    ActiveCharger,
    DeviceCharged,
    UserName
  },
  computed: {
    elapsedTime() {
      return Math.floor((this.nowTime - new Date(this.latest.start_time)) / 1000);
    }
  },
  methods: {
    formatTimeDiff(secDiff) {
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
      self.nowTime = Math.floor(new Date);
      requestAnimationFrame(timerLoop);
    }());
    (function currentAnimationLoop() {
      const diff = self.latest.current.toFixed(0) - self.currentmA;
      if(Math.abs(diff) > 0) {
        const sign = diff / Math.abs(diff);
        if(Math.abs(diff) > 100) {
          self.currentmA += sign * 7 * 7;
        }
        else if(Math.abs(diff) > 50) {
          self.currentmA += sign * 7;
        }
        else {
          self.currentmA += sign;
        }
      }
      requestAnimationFrame(currentAnimationLoop);
    }());
  }
}
</script>
