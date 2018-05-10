<template>
  <div>
  </div>
</template>

<style scoped>
div {
  max-width : 250px;
  min-width : 80px;
}
</style>

<script>
import 'jquery-circliful';

export default {
  data() { return {}},
  props : {
    name : Number,
    soc  : Number
  },
  mounted () {
    $(this.$el).circliful({
      width                 : 10,
      animationStep         : 5,
      foregroundColor       : '#9f3',
      backgroundBorderWidth : 2,
      backgroundColor       : "#eee",
      fontColor             : '#333',
      percent               : this.soc,
      text                  : this.name,
    });
  }
}
</script>