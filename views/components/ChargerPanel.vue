<template>
  <div>
    <p>{{ charger.manufacturer || '製造元不明' }}</p>
    <p class="large">{{ charger.name || '名称不明' }}</p>
    <ChargerSocGraph
      v-if="charger.capacity"
      :key="calcKey"
      :residual="charger.residual + 0"
      :capacity="charger.capacity + 0"
      :option="socOption"
    ></ChargerSocGraph>
    <p>推定残量</p>
    <p class="large">{{ charger.residual.toFixed(0) }} / {{ charger.capacity }} mAh</p>
    <p>
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
      <button
        @click="chargerId=charger._id"
        class="btn btn-default"
      >100%に設定</button>
    </p>
    <ChargerSetFull
      :chargerId="chargerId"
      @close="chargerId=''"
      @chargerSetFullDone="chargerId=''; $emit('chargerUpdated', charger._id)"
    ></ChargerSetFull>
  </div>
</template>


<style scoped>
p {
  font-size: 20px;
}
p.large {
  font-size: 30px;
}
</style>

<script>
const axios = require('axios');
import ChargerSetFull from './ChargerSetFull.vue';
import ChargerSocGraph from './ChargerSocGraph.vue';

export default {
  data() { return {
    chargerId : '',
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
    ChargerSetFull,
    ChargerSocGraph
  },
  props : {
    active  : Object,
    charger : Object
  },
  computed : {
    isActive() {
      return this.active._id === this.charger._id
    },
    calcKey() {
      return `${this.charger._id}${Math.round(Math.random() * 1e6)}`;
    }
  },
  methods : {
    activateCharger() {
      axios.get('/api/charger/activate', { params : { id : this.charger._id }});
      this.$emit('chargerUpdated', this.charger._id);
    }
  }
}
</script>
