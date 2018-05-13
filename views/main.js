/*** Webpack build entry point ***/
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import axios from 'axios';
const Top = () => import(/* webpackChunkName : "top"*/ './routes/Top.vue');
const Login = () => import(/* webpackChunkName : "login"*/ './routes/Login.vue');
const DashBoard = () => import(/* webpackChunkName : "dashboard"*/ './routes/DashBoard.vue');
const MayFes = () => import(/* webpackChunkName : "dashboard"*/ './routes/MayFes.vue');
import 'bootstrap';

Vue.use(VueRouter);

window.onload = () => {
  const router = new VueRouter({
    routes : [
      { path : '/', component : Top },
      {
        path        : '/login',
        component   : Login,
        beforeEnter : async(to, from, next) => {
          const res = await axios.get('api/user/isAuthed');
          if (res.data.ok === false) {
            next();
          } else {
            next({ path : '/dashboard' });
          }
        }
      },
      {
        path        : '/dashboard',
        component   : DashBoard,
        beforeEnter : async(to, from, next) => {
          const res = await axios.get('api/user/isAuthed');
          if (res.data.ok === true) {
            next();
          } else {
            next({ path : '/login' });
          }
        }
      },
      {
        path        : '/mayfes',
        component   : MayFes,
        beforeEnter : async(to, from, next) => {
          const res = await axios.get('api/user/isAuthed');
          if (res.data.ok === true) {
            next();
          } else {
            next({ path : '/login' });
          }
        }
      },
      //{ path: '*', component: NotFound }
    ]
  });

  new Vue({
    el     : '#app',
    router,
    render : createElement => createElement(App)
  });
};
