<template>
  <section>
    <div class = "content">
      <div class="infobox">
        <ActiveCharger></ActiveCharger>
      </div>
      <div class="infoline">
      </div>
      <div class="infobox">
        <p>
          {{ isCharging ? '充電中' : '待機中' }}
        </p>
        <p>
          <small>経過時間</small><br>
          {{ formatTimeDiff(elapsedTime) }}
        </p>
        <p>
          <small>電流(平均)</small><br>
          {{ currentmA }} mA
        </p>
      </div>
      <div class="infoline">
      </div>
      <div class="infobox">
        <DeviceCharged></DeviceCharged>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  color: white;
  background-color: #444;
  height: 100vh;
}
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
  padding: 3vw;
}
div.infobox {
  background-color: #001017;
  padding: 15px;
  flex: 5 0 auto;
}
div.infoline {
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
      currentmA  : 0,
      isCharging : false,
      items      : [],
      latest     : {},
      nowTime    : 0,
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

    let es = new EventSource('/api/user/isCharging/push');
    es.addEventListener('message', event => {
      this.isCharging = JSON.parse(event.data); // convert to Boolean
    }, false);

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
