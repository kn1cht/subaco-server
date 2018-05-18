<template>
  <div class="vue-modal" :class="{ active : chargerId.length }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" aria-label="Close" @click="$emit('close')">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">バッテリを満充電の状態にします。よろしいですか？</h4>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="$emit('close')">
            キャンセル
          </button>
          <button type="button" class="btn btn-danger" @click="setFull">
            実行
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  div {
    color: black;
  }
  @keyframes show {
    from {
      opacity   : 0;
      transform : translate(0, -25%);
    }
    to {
      opacity   : 1;
      transform : translate(0, 0);
    }
  }
  .vue-modal {
    bottom     : 0;
    display    : none;
    left       : 0;
    position   : fixed;
    right      : 0;
    top        : 30vh;
    z-index    : 1050;
  }
  .vue-modal.active {
    animation: show 0.3s ease-out 0s;
    display    : block;
  }
</style>

<script>
const axios = require('axios');

export default {
  data() { return {} },
  props : {
    chargerId : {
      type     : String,
      required : true
    }
  },
  methods : {
    setFull() {
      axios.get('/api/charger/setFull', { params : { id : this.chargerId }});
      this.$emit('chargerSetFullDone', this.chargerId);
    }
  },
}
</script>
