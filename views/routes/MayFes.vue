<template>
  <section>
    <div class = "content">
      <div class="info-box">
        <ActiveCharger ref="ActiveCharger"></ActiveCharger>
      </div>
      <div class="info-line">
        <ChargeLine :isCharging="isCharging"></ChargeLine>
      </div>
      <div class="info-box">
        <MayFesMain :isCharging="isCharging" ref="MayFesMain"></MayFesMain>
      </div>
      <div class="info-line">
        <ChargeLine :isCharging="isCharging"></ChargeLine>
      </div>
      <div class="info-box">
        <DeviceCharged :isCharging="isCharging" ref="DeviceCharged"></DeviceCharged>
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
div.content {
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 3vw;
}
div.info-box {
  background-color: #001017;
  padding: 15px;
  flex: 2 0 auto;
  width: 320px;
  z-index: 1;
}
div.info-line {
  flex: 1 0 auto;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
</style>

<script>
const axios = require('axios');
import ActiveCharger from '../components/ActiveCharger.vue';
import ChargeLine from '../components/ChargeLine.vue';
import DeviceCharged from '../components/DeviceCharged.vue';
import UserName from '../components/UserName.vue';
import MayFesMain from '../components/MayFesMain.vue';
require('date-utils');

export default {
  data() {
    return {
      interval   : undefined,
      isCharging : false
    }
  },
  components : {
    ActiveCharger,
    ChargeLine,
    DeviceCharged,
    UserName,
    MayFesMain
  },
  methods: {
    reloadChildComponentsData() {
      this.$refs.MayFesMain.fetchLatestCharge();
      this.$refs.MayFesMain.currentmA = 0;
      this.$refs.DeviceCharged.fetchCharge();
      this.$refs.ActiveCharger.fetchCharger();

    }
  },
	async created() {
    const es = new EventSource('/api/user/isCharging/push');
    es.addEventListener('message', event => {
      this.isCharging = JSON.parse(event.data); // convert to Boolean
      this.reloadChildComponentsData();
    }, false);
    this.isCharging = (await axios.get('/api/user/info')).data.is_charging;
    this.interval = setInterval(() => {
      this.reloadChildComponentsData();
    }, 20000); // every 20 seconds
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
}
</script>
