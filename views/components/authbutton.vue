<template>
  <div>
    <a href="/logout" v-if="authed"><button type="submit" class="btn navbar-btn btn-success btn-sm">ログアウト</button></a>
    <router-link to="/login" v-else><button type="submit" class="btn navbar-btn btn-success btn-sm">ログイン</button></router-link>
  </div>
</template>
 
<script>
const axios = require('axios');

export default {
  data() { return { authed : false }},
	async created() {
    let res = await axios.get('/api/user/isAuthed');
    this.authed = res.data.ok;
  }
}
</script>