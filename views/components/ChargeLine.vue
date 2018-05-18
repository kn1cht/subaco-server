<template>
  <div class="charge-line" :class="{ active : isCharging }">
    <div v-if="isCharging" class="progress-icon" :class="{ active : isCharging }"></div>
  </div>
</template>

<style scoped>
.charge-line {
  background-color: #777;
  box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.6) inset;
  height: 100px;
  left: -10%;
  margin-top: 200px;
  position: relative;
  width: 120%;
}
.charge-line.active {
  background-color: #999;
}
.progress-icon {
  background: #93f233;
  display: none;
  filter: blur(6px);
  height: 90px;
  position: absolute;
  top: 5px;
  width: 10px;
}
@keyframes progress {
  from {
    transform : translate(-20px, 0);
  }
  75% {
    transform : translate(60px, 0);
  }
  to {
    transform : translate(60px, 0);
  }
}
.progress-icon.active {
  animation: progress 1s linear 0s infinite;
  display: block;
}
</style>

<script>
export default {
  props : {
    isCharging : {
      type : Boolean,
      default : false
    }
  }
}
</script>
