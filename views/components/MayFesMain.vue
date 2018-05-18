<template>
  <div class="wrapper">
    <div class="main-logo">
      <img v-if="isCharging" src="../../static/logotype-withtext.png" alt="SUBACO logotype">
      <img v-else src="../../static/logotype-withtext-disabled.png" alt="SUBACO logotype disabled">
    </div>
    <hr>
    <p v-if="isCharging" class="center active">充電中</p>
    <p v-else class="center inactive">待機中</p>
    <p><small>経過時間</small></p>
    <p v-if="isCharging" class="center">{{ formatTimeDiff(elapsedTime) }}</p>
    <p v-else class="center inactive">--:--:--</p>
    <p><small>電流(平均)</small></p>
    <p v-if="isCharging" class="center">{{ currentmA }} mA</p>
    <p v-else class="center inactive">-- mA</p>
  </div>
</template>

<style scoped>
div.wrapper {
  border: solid 1px #ddd;
  padding: 14px;
}
p {
  font-size: 50px;
}
p small {
  font-size: 30px;
}
p.center {
  text-align: center;
}
p.active {
  color: #93f233;
}
p.inactive {
  color: #7e8d6f;
}
.main-logo > img {
  width: 100%
}
</style>

<script>
const axios = require('axios');
require('date-utils');

export default {
  data() {
    return {
      currentmA  : 0,
      latest     : { current : 0 },
      nowTime    : 0
    }
  },
  props : {
    isCharging : {
      type    : Boolean,
      default : false
    }
  },
  methods: {
    async fetchLatestCharge() {
      let res = await axios.get('/api/charge/latest');
      this.latest = res.data.charge;
    },
    formatTimeDiff(secDiff) {
      if(secDiff < 0) { return 'error'; }
      let minDiff = Math.floor(secDiff / 60);
      secDiff -= minDiff * 60;
      let hourDiff = Math.floor(minDiff / 60);
      minDiff -= hourDiff * 60;
      const dayDiff = Math.floor(hourDiff / 24);
      hourDiff -= dayDiff * 24;
      const fillByZero = (str) => {
        return ('0'+ str).slice(-2);
      }
      if(dayDiff === 0) { return `${fillByZero(hourDiff)}:${fillByZero(minDiff)}:${fillByZero(secDiff)}`; }
      else { return `${fillByZero(dayDiff)}:${fillByZero(hourDiff)}:${fillByZero(minDiff)}:${fillByZero(secDiff)}`; }
    }
  },
  computed: {
    elapsedTime() {
      return Math.floor((this.nowTime - new Date(this.latest.start_time)) / 1000);
    }
  },
	async created() {
    await this.fetchLatestCharge();

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
