<template>
    <Tabs :options="{ useUrlFragment: false }">
      <Tab :name="chargerTabs[0].name">
        <ChargerPanel v-if="activeCharger._id" :charger=chargerTabs[0] :active=activeCharger @chargerActivated="fetchCharger"></ChargerPanel>
      </Tab>
      <Tab :name="chargerTabs[1].name">
        <ChargerPanel v-if="activeCharger._id" :charger=chargerTabs[1] :active=activeCharger @chargerActivated="fetchCharger"></ChargerPanel>
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
  transform: translateY(-4px);
  z-index: 0;
}
.tabs-component-tab:hover {
  color: #666;
}
.tabs-component-tab.is-active {
  border-top: solid 1px #001017;
  color: #000;
  transform: translateY(-2px);
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
import {Tabs, Tab} from 'vue-tabs-component';
import ChargerPanel from './ChargerPanel.vue';

export default {
  data() { return {
    activeCharger : {},
    chargers      : {},
    chargerTabs   : []
  }},
  components : {
    ChargerPanel,
    Tab,
    Tabs
  },
  methods : {
    async fetchCharger() {
      this.chargers = (await axios.get('/api/charger/list')).data.list;
      this.activeCharger = (await axios.get('/api/user/activeCharger')).data.charger;
    }
  },
	async created() {
    await this.fetchCharger();
    this.chargerTabs = this.chargerTabs.concat(this.chargers.filter((val) => { return val.name === 'PowerCore 20100'; }));
    this.chargerTabs = this.chargerTabs.concat(this.chargers.filter((val) => { return val.name === 'PowerCore Fusion 5000'; }));
  }
}
</script>
