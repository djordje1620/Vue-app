<template>
  <div class="d-flex">
    <nav class="nav flex-column bg-dark p-3" style="min-width: 200px;">
      <router-link to="/dashboard/products" class="text-light text-decoration-none h3">Products</router-link>
      <router-link to="/dashboard/categories" class="text-light text-decoration-none h3">Categories</router-link>
      <router-link to="/dashboard/users" class="text-light text-decoration-none h3">Users</router-link>
    </nav>

    <div class="flex-grow-1 p-3" id="main">
      <div v-if="isDashboard">
        <div class="welcome-message mb-4">
          <h2>Welcome to the Admin Panel!</h2>
          <p>Here you can manage products, categories, users, and view orders.</p>
        </div>

        <div class="stats mb-4">
          <div class="row">
            <div class="col-md-4">
              <div class="card text-white bg-primary mb-3">
                <div class="card-header">Products</div>
                <div class="card-body">
                  <h5 class="card-title">Number of Products: {{ productsCount }}</h5>
                  <p class="card-text">View and manage all products in your system.</p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card text-white bg-success mb-3">
                <div class="card-header">Categories</div>
                <div class="card-body">
                  <h5 class="card-title">Number of Categories: {{ categoriesCount }}</h5>
                  <p class="card-text">Organize products into different categories.</p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card text-white bg-warning mb-3">
                <div class="card-header">Users</div>
                <div class="card-body">
                  <h5 class="card-title">Number of Users: {{ usersCount }}</h5>
                  <p class="card-text">Manage registered users of the system.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <UserMessage />


        <div class="orders-table mt-4">
          <h2 class="mb-4">Order List</h2>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Total Price</th>
                <th>City</th>
                <th>Street</th>
                <th>Phone Number</th>
                <th>User</th>
                <th>User email</th>
                <th>Products</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(order, index) in orders" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ order.date }}</td>
                <td>{{ order.total.toFixed(2) }} $</td>
                <td>{{ order.user.city }}</td>
                <td>{{ order.user.street }}</td>
                <td>{{ order.user.phone }}</td>
                <td>{{ order.user.firstName }} {{ order.user.lastName }}</td>
                <td>{{ order.user.email }}</td>
                <td>
                  <ul>
                    <li v-for="product in order.products" :key="product.id">
                      {{ product.title }} - {{ product.quantity }} x {{ product.price.toFixed(2) }} $
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

     
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import UserMessage from '@/components/admin/UserMessage.vue';

export default {
  name: 'AdminPanel',
  components: {
    UserMessage
  },
  data() {
    return {
      productsCount: 0,
      categoriesCount: 0,
      usersCount: 0,
      orders: [],
    };
  },
  async mounted() {
    // Broj proizvoda
    try {
      const productsResponse = await axios.get('http://localhost:3001/api/v1/products');
      this.productsCount = productsResponse.data.length;

      // Broj kategorija
      const categoriesResponse = await axios.get('http://localhost:3001/api/v1/categories');
      this.categoriesCount = categoriesResponse.data.length;

      // Broj korisnika
      const users = JSON.parse(localStorage.getItem('users')) || [];
      this.usersCount = users.length;

      
      const orders = JSON.parse(localStorage.getItem('orders')) || [];
      this.orders = orders;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
  computed: {
    isDashboard() {
      return this.$route.path === '/dashboard';
    }
  }
};
</script>

<style scoped>
nav {
  position: sticky;
  top: 0; 
  height: 100vh;
  overflow-y: auto; 
}
.nav-link {
  color: #fff;
}
.nav-link.active {
  font-weight: bold;
}

#welcome-message {
  margin-bottom: 20px;
}

.stats .card {
  text-align: center;
}

.table {
  margin-top: 20px;
}
</style>
