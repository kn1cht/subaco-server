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
    residual : Number,
    capacity : Number,
    option   : {
      type   : Object,
      default: {}
    }
  },
  methods : {
    soc(residual, capacity) {
      const percentage = residual / capacity * 100;
      return Math.max( Math.min(percentage, 100), 0).toFixed(2);
    }
  },
  mounted () {
    const defaultOpt = {
      width                 : 10,
      animationStep         : 5,
      foregroundColor       : '#9f3',
      backgroundBorderWidth : 2,
      backgroundColor       : "#eee",
      fontColor             : '#333',
      percent               : this.soc(this.residual, this.capacity)
    };
    $(this.$el).circliful(Object.assign(defaultOpt, this.option));
  }
}
</script>
