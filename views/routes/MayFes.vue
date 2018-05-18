<template>
  <section>
    <div class = "content">
      <div class="infobox">
        <ActiveCharger ref="ActiveCharger"></ActiveCharger>
      </div>
      <div class="infoline">
      </div>
      <div class="infobox">
        <MayFesMain :isCharging="isCharging" ref="MayFesMain"></MayFesMain>
      </div>
      <div class="infoline">
      </div>
      <div class="infobox">
        <DeviceCharged ref="DeviceCharged"></DeviceCharged>
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
div.infobox {
  background-color: #001017;
  padding: 15px;
  flex: 2 0 auto;
  width: 300px;
}
div.infoline {
  flex: 1 0 auto;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
</style>

<script>
const axios = require('axios');
import ActiveCharger from '../components/ActiveCharger.vue';
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
