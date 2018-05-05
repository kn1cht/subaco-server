<template>
  <section class="container">
    <div>
      <UserName></UserName>
    </div>

    <div class="panel panel-info">
      <div class="panel-heading">
        <h4><i class="fa fa-fw fa-pie-chart" aria-hidden="true"></i>全般</h4>
      </div>
      <ChargerOverView class="panel-body"></ChargerOverView>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="panel panel-info">
          <div class="panel-heading">
            <h4><i class="fa fa-fw fa-battery-full" aria-hidden="true"></i> 充電器情報</h4>
          </div>
          <ChargerList class="panel-body"></ChargerList>
        </div>
      </div>
      <div class="col-md-6">
        <div class="panel panel-info">
          <div class="panel-heading">
            <h4><i class="fa fa-fw fa-mobile" aria-hidden="true"></i>端末情報</h4>
          </div>
          <DeviceList class="panel-body"></DeviceList>
        </div>
      </div>
    </div>
    <div  class="panel panel-info">
      <div class="panel-heading">
        <h4><i class="fa fa-fw fa-history" aria-hidden="true"></i>充電履歴</h4>
      </div>
      <ChargeList></ChargeList>
    </div>
  </section>
</template>

<script>
import ChargeList from '../components/ChargeList.vue';
import ChargerList from '../components/ChargerList.vue';
import ChargerOverView from '../components/ChargerOverView.vue';
import DeviceList from '../components/DeviceList.vue';
import UserName from '../components/UserName.vue';

export default {
  components : {
    ChargeList,
    ChargerList,
    ChargerOverView,
    DeviceList,
    UserName
  }
}
</script>
