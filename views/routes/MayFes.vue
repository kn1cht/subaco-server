<template>
  <section class="container">
    <div>
      <UserName></UserName>
    </div>
    <div class = "content">
      <div class="panel panel-info">
        <div class="panel-heading">
          <h4><i class="fa fa-fw fa-mobile" aria-hidden="true"></i>端末情報</h4>
        </div>
        <ActiveCharger class="panel-body"></ActiveCharger>
      </div>
      <div class="panel panel-info">
        <div class="panel-heading">
          <h4><i class="fa fa-fw fa-mobile" aria-hidden="true"></i>端末情報</h4>
        </div>
        <DeviceList class="panel-body"></DeviceList>
      </div>

    </div>
  </section>
</template>

<style scoped>
div.content {
    display: flex;
    flex: 1 0 auto;
    flex-wrap: wrap;
    justify-content: flex-start;
}
</style>

<script>
import ActiveCharger from '../components/ActiveCharger.vue';
import DeviceList from '../components/DeviceList.vue';
import UserName from '../components/UserName.vue';

export default {
  components : {
    ActiveCharger,
    DeviceList,
    UserName
  }
}
</script>
