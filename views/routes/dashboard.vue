<template>
  <section class="container">
    <div>
      <user-name></user-name>
    </div>

    <div class="panel panel-info">
      <div class="panel-heading">
        <h4><i class="fa fa-fw fa-pie-chart" aria-hidden="true"></i>全般</h4>
      </div>
      <charger-overview class="panel-body"></charger-overview>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="panel panel-info">
          <div class="panel-heading">
            <h4><i class="fa fa-fw fa-battery-full" aria-hidden="true"></i> 充電器情報</h4>
          </div>
          <charger-list class="panel-body"></charger-list>
        </div>
      </div>
      <div class="col-md-6">
        <div class="panel panel-info">
          <div class="panel-heading">
            <h4><i class="fa fa-fw fa-mobile" aria-hidden="true"></i>端末情報</h4>
          </div>
          <device-list class="panel-body"></device-list>
        </div>
      </div>
    </div>
    <div  class="panel panel-info">
      <div class="panel-heading">
        <h4><i class="fa fa-fw fa-history" aria-hidden="true"></i>充電履歴</h4>
      </div>
      <charge-list></charge-list>
    </div>
  </section>
</template>

<script>
import ChargeList from '../components/chargelist.vue';
import ChargerList from '../components/chargerlist.vue';
import ChargerOverView from '../components/chargeroverview.vue';
import DeviceList from '../components/devicelist.vue';
import UserName from '../components/username.vue';

export default {
  components : {
    'charge-list'      : ChargeList,
    'charger-list'     : ChargerList,
    'charger-overview' : ChargerOverView,
    'device-list'      : DeviceList,
    'user-name'        : UserName
  }
}
</script>
