<template>
  <div>
    <!-- Static navbar -->
    <nav class="navbar navbar-inverse navbar-static-top" style="padding:0 15px;">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link to="/" class="navbar-brand">
            <img src="../static/logotype-small.png" alt="SUBACO logotype">
          </router-link>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li><router-link to="/dashboard">ダッシュボード</router-link></li>
            <li><router-link to="/mayfes">五月祭</router-link></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <auth-button></auth-button>
          </ul>
        </div><!--/.nav-collapse -->
      </div><!--/.container-fluid -->
    </nav>
    <router-view></router-view>
  </div>
</template>

<style scoped>
  .navbar {
    margin : 0;
  }
  .navbar-brand {
    padding : 7px;
  }
  img {
    height : 100%;
  }
</style>

<script>
import AuthButton from './components/authbutton.vue';

export default {
  components : {
    'auth-button' : AuthButton
  }
}
</script>

