<template>
  <div>
    <p>{{ charger.manufacturer || '製造元不明' }}</p>
    <p class="large">{{ charger.name || '名称不明' }}</p>
    <ChargerSocGraph
      v-if="charger.capacity"
      :residual="charger.residual + 0"
      :capacity="charger.capacity + 0"
      :option="socOption"
    ></ChargerSocGraph>
    <p>推定残量</p>
    <p class="large" style="float:left">{{ charger.residual.toFixed(0) }} / {{ charger.capacity }} mAh</p>
    <button
      v-if="isActive"
      class="btn btn-primary"
      disabled="disabled"
    >使用中</button>
    <button
      v-else
      @click="activateCharger"
      class="btn btn-primary"
    >使う</button>
  </div>
</template>


<style scoped>
p {
  font-size: 20px;
}
p.large {
  font-size: 30px;
}
button {
  margin:5px 10px
}
</style>

<script>
const axios = require('axios');
import ChargerSocGraph from './ChargerSocGraph.vue';

export default {
  data() { return {
    socOption : {
      animation             : 0,
      backgroundBorderWidth : 15,
      fontColor             : '#eee',
      percentageTextSize    : 30,
      percentageY           : 120,
      textColor             : '#ccc'
    }
  }},
  components : {
    ChargerSocGraph
  },
  props : {
    active  : Object,
    charger : Object
  },
  computed : {
    isActive() {
      return this.active._id === this.charger._id
    }
  },
  methods : {
    activateCharger() {
      axios.get('/api/charger/activate', { params : { id : this.charger._id }});
      this.$emit('chargerActivated', this.charger._id);
    }
  }
}
</script>
