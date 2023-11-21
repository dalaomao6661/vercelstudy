import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useLoginUserStore } from '@/stores/loginUser'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/class',
      name: 'class',
      component: () => import('@/views/ClassView.vue')
    },
    {
      path: '/disscussion',
      name: 'disscussion',
      component: () => import('@/views/DiscussionView.vue')
    },
    {
      path: '/instance',
      name: 'instance',
      component: () => import('@/views/InstanceView.vue')
    },
    {
      path: '/question',
      name: 'question',
      component: () => import('@/views/QuestionsView.vue')
    },
    {
      path: '/share',
      name: 'share',
      component: () => import('@/views/ShareView.vue')
    },
    {
      path: '/askquestion',
      name: 'askquestion',
      component: () => import('@/views/question/AskQuestionView.vue')
    },
    {
      path: '/opendiscussion',
      name: 'opendiscussion',
      component: () => import("@/views/discussion/DIscussionView.vue")
    },
    {
      path: '/discussiondetail',
      name: 'discussiondetail',
      component: () => import("@/views/discussion/DisscussionDetailView.vue")
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("@/views/LoginView.vue")
    },
    {
      path: '/questiondetail',
      name: 'questiondetail',
      component: () => import("@/views/question/QuestionDetail.vue")
    },
  ]
})
router.beforeEach((to, from, next) => {
  const loginUserStore = useLoginUserStore()
  const path = to.path
  console.log(path);
  
  switch (path) {
    case '/':
    case '/class':
    case '/disscussion':
    case '/instance': 
    case '/question':
    case '/share': 
    case '/login':
    case '/discussiondetail': next();return;break;
  }
  if(!loginUserStore.isLogin()) {
    router.push('/login') 
  }else {
    next()
  }
  
})

export default router
