import Vue from 'vue';
import VueRouter from 'vue-router';
import Game from '../presenters/gamePresenter.js';
import Scoreboard from '../presenters/scoreboardPresenter.js';
import HomePage from '../presenters/homePagePresenter.js';
import GameOver from '../presenters/gameOverPresenter.js';
import RegisterPage from '../presenters/registerPagePresenter'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/game',
    name: 'game',
    component: Game,
    // component: () => import(/* webpackChunkName: "game" */ '../presenters/gamePresenter.js')
  },
  {
    path: '/scoreboard',
    name: 'scoreboard',
    component: Scoreboard
  },
  {
    path: '/gameover',
    name: 'gameover',
    component: GameOver
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  },
]

const router = new VueRouter({
  routes
})

export default router;