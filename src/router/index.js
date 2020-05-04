import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HomeAdmin from '../views/HomeAdmin'
import store from '../store/user_store'
import NewExercise from '../views/exercises/NewExercise'
import Exercises from '@/views/exercises/Exercises'
import EditExercise from '@/views/exercises/EditExercise'
import HomeUser from '@/views/HomeUser'
import ShowWorkout from '@/views/workouts/ShowWorkout'
import ProgressWorkout from '@/views/workouts/ProgressWorkout'
import NewExerciseReport from '@/views/exercise_reports/NewExerciseReport'
import NewWorkout from '@/views/workouts/NewWorkout'
import SeriesReportProgression from '@/views/series_reports/SeriesReportProgression'

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
  { path: '/home/admin', component: HomeAdmin },
  { path: '/admin/exercises/new', component: NewExercise },
  { path: '/admin/exercises', component: Exercises },
  { path: '/admin/exercises/:id/edit', component: EditExercise },
  { path: '/home/user', component: HomeUser },
  { path: '/user/workouts/new', component: NewWorkout },
  { path: '/user/workouts/:id', component: ShowWorkout },
  { path: '/user/workout_report/:id/progress', component: ProgressWorkout },
  { path: '/user/exercise_report/:id', component: NewExerciseReport },
  { path: '/user/series_reports/:exercise_id/progression', component: SeriesReportProgression }
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
  const is_user_url = to.path.includes('/user')

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
  } else if(is_user_url && (store.getters['user'].kind != "user")) {
    return next({
      path: '/',
      query: { returnUrl: to.path }
    });
  }

  next();
});

export default router
