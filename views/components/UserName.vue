<template>
  <p><b> {{ user.username }}さん </b></p>
</template>

<script>
const axios = require('axios');

export default {
  data() { return { user : {} }},
	async created() {
    this.user = (await axios.get('/api/user/info')).data;
  }
}
</script>
