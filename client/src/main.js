import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'


// import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth.vue";
import Error from "./pages/Error.vue";
import Home from "./pages/Home.vue";
import ResetPassword from "./pages/ResetPassword.vue";


import store from "./store"

import axios from 'axios';

import UsernameView from "./pages/UserName.vue";
import saveToken from "./pages/saveToken.vue";


import Profile from "./pages/Profile.vue";
import Settings from "./pages/Settings.vue";
import FindAliens from "./pages/FindAliens.vue";
import Notifications from "./pages/Notifications.vue";

axios.defaults.baseURL = 'http://localhost:3000';

Vue.use(VueRouter);


axios.interceptors.request.use((config) => {
  config.headers.Authorization = "Bearer "+ (localStorage.getItem('token') || "");
  return config;
}, (error) => {
  return Promise.reject(error);
});
axios.interceptors.response.use((response) => {
   
    if (response.status === 401) {
         //redirect to login screen
    }
    return response;
}, (error) => {
  console.log(error.response.status);
    if(error.response.status===401){
        window.localStorage.clear();
        router.replace("/auth/switch/login");
    }
    if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
});


const router = new VueRouter({
  mode:"history",
  routes:[
    // {path:"/welcome",component:LandingPage,exact:true},
    {path:"/auth/switch/:type",component:Auth },
    {path:"/resetpassword",component:ResetPassword},
    {path:"/signup/createuserame",component:UsernameView},
    {path:"/signin/saveToken",component:saveToken},
    {path:"/",
     component:Home,
     exact:true,
     children:[
       {
        path:"aliens",
        name:"aliens",
        component: FindAliens
      },
       {
        path: "profile/:username/followers",
        name:"findaliens",
        component: FindAliens
      },
       {
        path: "notifications",
        name:"findaliens",
        component: Notifications
      },
       {
        path: "profile/:username/following",
        name:"findaliens",
        component: FindAliens
      },
       {
        path:"profile/:username?",
        name:"profile",
        component: Profile
      },
       {
        path:"settings",
        name:"settings",
        component: Settings
      },
    ]
    },
    
    {path:"*",component:Error},
  ],
})


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
