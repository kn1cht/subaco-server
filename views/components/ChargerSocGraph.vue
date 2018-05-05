<template>
  <div>
  </div>
</template>

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
      width                 : 30,
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