<template>
    <Tabs :options="{ useUrlFragment: false }">
      <Tab :name="chargerTabs[0].name">
        <div>
          <p style="font-size: 20px;">{{ chargerTabs[0].manufacturer || '製造元不明' }}</p>
          <p style="font-size: 30px;">{{ chargerTabs[0].name || '名称不明' }}</p>
          <ChargerSocGraph
            v-if="chargerTabs[0].capacity"
            :residual="chargerTabs[0].residual + 0"
            :capacity="chargerTabs[0].capacity + 0"
            :option="socOption"
          ></ChargerSocGraph>
        </div>
      </Tab>
      <Tab :name="chargerTabs[1].name">
        <div>
          <p style="font-size: 20px;">{{ chargerTabs[1].manufacturer || '製造元不明' }}</p>
          <p style="font-size: 30px;">{{ chargerTabs[1].name || '名称不明' }}</p>
          <ChargerSocGraph
            v-if="chargerTabs[1].capacity"
            :residual="chargerTabs[1].residual + 0"
            :capacity="chargerTabs[1].capacity + 0"
            :option="socOption"
          ></ChargerSocGraph>
        </div>
      </Tab>
    </Tabs>
</template>


<style>
.tabs-component {
  display: flex;
  flex-direction: column;
}
.tabs-component-tabs {
  display: flex;
  justify-content: flex-start;
  order: 2;
  padding: 0;
}
.tabs-component-tab {
  background-color: #001017;
  border: solid 1px #ddd;
  color: #999;
  font-size: 14px;
  font-weight: 600;
  list-style: none;
  transition: transform .3s ease;
  transform: translateY(-3px);
  z-index: 0;
}
.tabs-component-tab:hover {
  color: #666;
}
.tabs-component-tab.is-active {
  border-top: solid 1px #001017;
  color: #000;
  transform: translateY(-1px);
  z-index: 2;
}
.tabs-component-tab-a {
  align-items: center;
  color: #ccc;
  display: flex;
  padding: .75em 1em;
  text-decoration: none;
}
.tabs-component-tab-a:hover, .tabs-component-tab-a:focus {
  color: #eee;
  text-decoration: none;
}
.tabs-component-panels {
  background-color: #001017;
  border: solid 1px #ddd;
  order: 1;
  padding: 1em;
  z-index: 0;
}
</style>

<script>
const axios = require('axios');
import {Tabs, Tab} from 'vue-Tabs-component';
import ChargerSocGraph from './ChargerSocGraph.vue';

export default {
  data() { return {
    activeCharger : {},
    chargers      : {},
    chargerTabs   : [],
    socOption     : {
      animation             : 0,
      backgroundBorderWidth : 15,
      fontColor             : '#eee',
      percentageTextSize    : 30,
      percentageY           : 120,
      textColor             : '#ccc'
    }
  }},
  components : {
    ChargerSocGraph,
    Tab,
    Tabs
  },
  methods : {},
	async created() {
    this.activeCharger = (await axios.get('/api/user/activeCharger')).data.charger;
    this.chargers = (await axios.get('/api/charger/list')).data.list;
    this.chargerTabs = this.chargerTabs.concat(this.chargers.filter((val) => { return val.name === 'PowerCore 20100'; }));
    this.chargerTabs = this.chargerTabs.concat(this.chargers.filter((val) => { return val.name === 'PowerCore Fusion 5000'; }));
  }
}
</script>
