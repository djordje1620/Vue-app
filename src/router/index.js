import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import ContactView from '@/views/ContactView.vue';
import ShopView from '@/views/ShopView.vue';
import SingleView from '@/views/SingleView.vue';
import LoginView from '@/views/LoginView.vue';
import CartView from '@/views/CartView.vue';
import LogoutView from '@/views/LogoutView.vue';
import RegisterView from '@/views/RegisterView.vue';
import AdminPanelView from '@/views/AdminPanelView.vue';
import AdminCategories from '@/components/admin/AdminCategories.vue';
import AdminProducts from '@/components/admin/AdminProducts.vue';
import AdminUsers from '@/components/admin/AdminUsers.vue';
import UpdateProduct from '@/components/admin/UpdateProduct.vue'; 
import UpdateCategory from '@/components/admin/UpdateCategory.vue'; 
import CartInfo from '@/components/CartInfo.vue'; 
import UserView from '@/views/UserView.vue';
import UserInfo from '@/components/user/UserInfo.vue';
import UserPurchase from '@/components/user/UserPurchase.vue';

import store from '@/store';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { title: 'ZayShop | Home' }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: { title: 'ZayShop | About' }
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
    meta: { title: 'ZayShop | Contact' }
  },
  {
    path: '/products',
    name: 'products',
    component: ShopView,
    meta: { title: 'ZayShop | Products' },
    props: (route) => ({ categoryId: route.query.categoryId || null }),
  },
  {
    path: '/product/:id',
    name: 'single-products',
    component: SingleView,
    props: true,
    meta: { title: 'ZayShop | Single product' }
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView,
    meta: { title: 'ZayShop | CartView' },
    children: [
      {
        path: 'info',
        name: 'cart-info',
        component: CartInfo,
        meta: { requiresAuth: true }, // Meta podatak za autentifikaciju
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { title: 'ZayShop | Login', requiresGuest: true }
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutView,
    meta: { title: 'ZayShop | Logout', requiresGuest: false }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { title: 'ZayShop | Register', requiresGuest: true }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: AdminPanelView,
    meta: { title: 'ZayShop | Dashboard', requiresAuth: true, requiredRole: 'admin' },
    children: [
      {
        path: 'products',
        component: AdminProducts,
      },
      {
        path: 'categories',
        component: AdminCategories,
      },
      {
        path: 'users',
        component: AdminUsers,
      },
      {
        path: 'products/edit/:id',
        name: 'edit-product',
        component: UpdateProduct,
        props: true,
        meta: { title: 'ZayShop | Edit Product', requiresAuth: true, requiredRole: 'admin' }
      },
      {
        path: 'categories/edit/:id',
        name: 'edit-category',
        component: UpdateCategory,
        props: true,
        meta: { title: 'ZayShop | Edit Category', requiresAuth: true, requiredRole: 'admin' }
      },
    ],
  },
  {
    path: '/user',
    name: 'user',
    component: UserView,
    meta: { title: 'ZayShop | User' },
    children: [
      {
        path: 'info',
        name: 'user-info',
        component: UserInfo,
        meta: { requiresAuth: true }, 
      },
      {
        path: 'purchase',
        name: 'purchase',
        component: UserPurchase,
        meta: { requiresAuth: true }, 
      },
    ]
  },
  // Catch-all ruta za nepostojeće rute
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  const userRole = store.getters.currentUser?.role;
  const userStatus = store.getters.currentUser?.status;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Преусмери ако корисник није пријављен
  } else if (to.meta.requiresAuth && userStatus !== 'active') {
    next('/login'); // Преусмери ако корисник није активан
  } else if (to.meta.requiredRole && userRole !== to.meta.requiredRole) {
    next('/'); // Преусмери ако корисник нема одговарајућу улогу
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next('/home'); // Преусмери ако је гост у питању и корисник је пријављен
  } else {
    if (to.meta.title) {
      document.title = to.meta.title; // Подешавање наслова странице
    } else {
      document.title = 'ZayShop'; // Подразумевани наслов
    }
    next();
  }
});

export default router;
