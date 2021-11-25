
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: '/merchant', component: () => import('pages/Merchant.vue'), meta: {
          requiresAuth: true
        }
      },
      {
        path: '/userprofile', component: () => import('pages/UserPage.vue'), meta: {
          requiresAuth: true
        }
      },
      {
        path: '/shop', component: () => import('pages/ShopsPage.vue'), meta: {
          requiresAuth: true
        }
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
