<template>
  <!-- Header -->
<nav class="navbar navbar-expand-lg navbar-light shadow">
  <div class="container d-flex justify-content-between align-items-center">

    <!-- Лого и линк на почетну страну -->
    <router-link class="navbar-brand text-success logo h1 align-self-center" to="/home">
      Zay
    </router-link>

    <!-- Тастер за мобилни мени -->
    <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#templatemo_main_nav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Главни мени са рутама -->
    <div class="align-self-center collapse navbar-collapse flex-fill d-lg-flex justify-content-lg-between" id="templatemo_main_nav">
      <div class="flex-fill">
        <ul class="nav navbar-nav d-flex justify-content-between mx-lg-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/home">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products">Shop</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact">Contact</router-link>
          </li>
          <!-- Логин и регистрација се приказују само ако корисник није пријављен -->
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link class="nav-link" to="/register">Register</router-link>
          </li>
          <!-- Logout се приказује само ако је корисник пријављен -->
          <li class="nav-item" v-if="isAuthenticated">
             <router-link class="nav-link" to="/logout">Logout</router-link>
          </li>
          <!-- Админ панел је доступан само ако је корисник пријављен и има улогу администратора -->
          <li class="nav-item" v-if="isAuthenticated && currentUser.role === 'admin'">
            <router-link class="nav-link" to="/dashboard">Admin Panel</router-link>
          </li>
        </ul>
      </div>

      <!-- Додатни елементи у навигацији (претрага, корпа, корисник) -->
      <div class="navbar align-self-center d-flex">
        <!-- Претрага за мобилне уређаје -->
        <div class="d-lg-none flex-sm-fill mt-3 mb-4 col-7 col-sm-auto pr-3">
          <div class="input-group">
            <input type="text" class="form-control" id="inputMobileSearch" placeholder="Search ...">
            <div class="input-group-text">
              <i class="fa fa-fw fa-search"></i>
            </div>
          </div>
        </div>

        <!-- Претрага за десктоп уређаје -->
        <a class="nav-icon d-none d-lg-inline" href="#" data-bs-toggle="modal" data-bs-target="#templatemo_search">
          <i class="fa fa-fw fa-search text-dark mr-2"></i>
        </a>

        <!-- Иконица корпе са бројем јединствених производа -->
        <a class="nav-icon position-relative text-decoration-none">
          <router-link class="nav-link" to="/cart">
            <i class="fa fa-fw fa-cart-arrow-down text-dark mr-1"></i>
            <span class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
              {{ uniqueProductCount }}
            </span>
          </router-link>
        </a>

        <!-- Иконица корисника -->
         <router-link class="nav-link" to="/user">
            <a class="nav-icon position-relative text-decoration-none" href="#">
              <i class="fa fa-fw fa-user text-dark mr-3"></i>
              <!-- Приказује име корисника ако је пријављен -->
              <span v-if="isAuthenticated" class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">{{ currentUser.firstName }} </span>
            </a>
        </router-link>
      </div>
    </div>
  </div>
</nav>

  <!-- Close Header -->
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    // Мапирање Vuex getters-а за аутентификацију и тренутног корисника
    ...mapGetters(['isAuthenticated', 'currentUser']),
    
    // Комјутерисано својство за број јединствених производа у корпи
    uniqueProductCount() {
      // Преузимање корпе из локалне меморије (ако је празна, враћа празан низ)
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      
      // Креирање сета (који не дозвољава дупликате) са ID-јевима производа
      // Враћа број јединствених производа у корпи
      return new Set(cart.map(item => item.id)).size;
    }
  }
};
</script>
