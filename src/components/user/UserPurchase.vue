<template>
  <div class="container my-5">
    <h1>User Purchases</h1>
    <table class="table table-striped mt-4" v-if="userOrders.length">
      <thead>
        <tr>
          <th>#</th>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in userOrders" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <ul>
              <li v-for="product in order.products" :key="product.id">
                {{ product.title }}
              </li>
            </ul>
          </td>
          <td>
            <ul>
              <li v-for="product in order.products" :key="product.id">
                {{ product.quantity }}
              </li>
            </ul>
          </td>
          <td>
            <ul>
              <li v-for="product in order.products" :key="product.id">
                ${{ product.price }}
              </li>
            </ul>
          </td>
          <td>${{ order.total }}</td>
          <td>{{ new Date(order.date).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>You have no purchases yet.</p>
  </div>
</template>

<script>
export default {
  name: 'UserPurchase',
  data() {
    return {
      userOrders: []
    };
  },
  mounted() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    this.userOrders = orders.filter(order => order.user.email === currentUser.email);
  }
};
</script>
<style scoped>
.table {
  margin-top: 20px;
}

.table thead {
  background-color: #343a40;
  color: white;
}

.table-hover tbody tr:hover {
  background-color: #f2f2f2;
}

.list-unstyled {
  margin: 0;
  padding: 0;
  list-style: none;
}

.alert-info {
  margin-top: 20px;
  text-align: center;
}
</style>
