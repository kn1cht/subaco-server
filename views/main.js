/*** Webpack build entry point ***/
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import axios from 'axios';
const Top = () => import(/* webpackChunkName: "top"*/ './routes/top.vue');
const Login = () => import(/* webpackChunkName: "login"*/ './routes/login.vue');
const Dashboard = () => import(/* webpackChunkName: "dashboard"*/ './routes/dashboard.vue');
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
        component   : Dashboard,
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
