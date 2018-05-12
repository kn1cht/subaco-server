<template>
  <section class="container">
    <div>
      <UserName></UserName>
    </div>
      <div class="panel panel-info">
        <div class="panel-heading">
          <h4><i class="fa fa-fw fa-mobile" aria-hidden="true"></i>端末情報</h4>
        </div>
        <DeviceList class="panel-body"></DeviceList>
      </div>
  </section>
</template>

<script>
import DeviceList from '../components/DeviceList.vue';
import UserName from '../components/UserName.vue';

export default {
  components : {
    DeviceList,
    UserName
  }
}
</script>
