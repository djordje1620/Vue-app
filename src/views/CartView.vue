<template>
  <div class="container my-5">
    <h2>Your Cart</h2>

    <div my-5 v-if="cart.length === 0" class="alert alert-info">
      Your cart is empty.
    </div>

    <table v-if="cart.length > 0" class="table">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cart" :key="index">
          <td>{{ item.title }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.price }} $</td>
          <td>{{ item.quantity * item.price }} $</td>
          <td>
            <button @click="removeFromCart(index)" class="btn btn-danger btn-sm">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="cart.length > 0" class="text-right">
      <h4>Total: {{ cartTotal }} $</h4>
      <button @click="proceedToCheckout" class="btn btn-primary mt-3">Checkout</button>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'CartView',
  setup() {
    const cart = ref([]);
    const cartTotal = ref(0);
    const router = useRouter();

    const loadCart = () => {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.value = storedCart;
      calculateTotal();
    };

    const calculateTotal = () => {
      cartTotal.value = cart.value.reduce((sum, item) => {
        return sum + item.quantity * item.price;
      }, 0);
    };

    const removeFromCart = (index) => {
      cart.value.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart.value));
      calculateTotal();
      window.location.href = '/cart';
    };

    const proceedToCheckout = () => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
        router.push('/cart/info');
      } else {
        router.push('/login');
      }
    };

    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener('cart-updated', handleCartUpdate);

    onMounted(() => {
      loadCart();
    });

    onBeforeUnmount(() => {
      window.removeEventListener('cart-updated', handleCartUpdate);
    });

    return { cart, cartTotal, removeFromCart, proceedToCheckout };
  }
};
</script>

<style scoped>
.table th, .table td {
  text-align: center;
}
.text-right {
  text-align: right;
}
</style>
