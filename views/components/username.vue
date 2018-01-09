<template>
  <p><b> {{ username }}さん </b></p>
</template>
 
<script>
const axios = require('axios');

export default {
  data() { return { username : '' }},
	async created() {
    let res = await axios.get('/api/user/info');
    this.username = res.data.name;
  }
}
</script>
