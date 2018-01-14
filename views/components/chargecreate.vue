<template>
  <div class="vue-modal" v-bind:class="{ active : create }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" aria-label="Close" @click="$emit('close')">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">新規充電を登録します</h4>
        </div>

        <div class="modal-body">
          <h4>開始時刻</h4>
          <div class="input-group col-sm-11">
            <span class="input-group-addon" id="ustart-time-addon">
              <i class="fa fa-fw fa-calendar-o"></i>
            </span>
            <input type="date" name="start-time" class="form-control"
                   aria-describedby="start-time-addon">
          </div>

          <h4>終了時刻</h4>
          <div class="input-group col-sm-11">
            <span class="input-group-addon" id="end-time-addon">
              <i class="fa fa-fw fa-calendar-o"></i>
            </span>
            <input type="date" name="end-time"  class="form-control"
                   aria-describedby="end-time-addon">
          </div>

          <h4>充電後の残量</h4>
          <div class="input-group col-sm-11">
            <span class="input-group-addon">
              <i class="fa fa-fw fa-battery-3"></i>
            </span>
            <input type="number" name="residual" class="form-control" 
                    placeholder="0-100" aria-label="number any residual">
          </div>

          <h4>充電器</h4>
          <div class="input-group col-sm-11">
            <span class="input-group-addon" id="charger-addon">
              <i class="fa fa-fw fa-plug"></i>
            </span>
            <select name="charger" class="form-control"
                    placeholder="充電器" aria-describedby="charger-addon">
              <option>
              </option>
            </select>
          </div>

          <h4>充電した端末</h4>
          <div class="input-group col-sm-11">
            <span class="input-group-addon" id="device-addon">
              <i class="fa fa-fw fa-mobile"></i>
            </span>
            <select name="device" class="form-control"
                    placeholder="充電した端末"  aria-describedby="device-addon">
              <option>
              </option>
            </select>
          </div>
          
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-default" @click="$emit('close')">
            キャンセル
          </button>
          <button type="button" class="btn btn-primary" @click="createCharge=1">
            充電を登録(未実装)
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
  props : [ 'create' ],
  methods : {
    createCharge() {
      axios.get('/api/charge/create', { params : {}});
      this.$emit('chargeCreateDone');
    }
  },
}
</script>
