<template>
  <div class="vue-modal" v-bind:class="{ active : deleteId !== null }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" aria-label="Close" @click="$emit('close')">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">削除したデータは元に戻せません。よろしいですか？</h4>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="$emit('close')">
            キャンセル
          </button>
          <button type="button" class="btn btn-danger" @click="delCharge">
            削除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
    top        : 0;
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
    deleteId : {
      type     : String,
      required : true
    }
  },
  methods : {
    delCharge() {
      axios.get('/api/charge/delete', { params : { id : this.deleteId }});
      this.$emit('chargeDeleteDone', this.deleteId);
    }
  },
}
</script>
