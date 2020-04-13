import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HomeAdmin from '../views/HomeAdmin'
import store from '../store/user_store'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/home/admin',
    name: 'HomeAdmin',
    component: HomeAdmin
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  
  const publicPages = ['/'];
  const authRequired = !publicPages.includes(to.path);  
 
  store.dispatch("session");
  let session = store.getters['has_session'];
  const is_admin_url = to.path.includes('/admin')

  if(authRequired && !session) {
    return next({
      path: '/',
      query: { returnUrl: to.path }
    });
  }else if(is_admin_url && (store.getters['user'].kind != "admin")){
    return next({
      path: '/',
      query: { returnUrl: to.path }
    });
  }

  next();
});

export default router
