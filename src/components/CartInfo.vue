<template>
  <div class="container my-5">
    <h2>Checkout</h2>
    <form @submit.prevent="submitOrder">
      <div class="form-group">
        <label for="city">City</label>
        <input v-model="form.city" type="text" id="city" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="street">Street</label>
        <input v-model="form.street" type="text" id="street" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="phone">Phone Number</label>
        <input v-model="form.phone" type="text" id="phone" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">Complete Purchase</button>
    </form>
    <div v-if="successMessage" class="alert alert-success mt-3">{{ successMessage }}</div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'CartInfo',
  setup() {
    const form = ref({
      city: '',
      street: '',
      phone: '',
    });
    const successMessage = ref('');

    const submitOrder = () => {
      
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      
      const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

 
      const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
      
      
      const order = {
        products: cart,
        total: totalPrice,
        user: {
          city: form.value.city,
          street: form.value.street,
          phone: form.value.phone,
          email: currentUser.email || '',  
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
        },
        date: new Date().toISOString()
      };

      
      const orders = JSON.parse(localStorage.getItem('orders')) || [];
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));

      localStorage.removeItem('cart');
      successMessage.value = 'You have successfully placed your order!';

      
      setTimeout(() => {
        window.location.href = '/home';
      }, 2000); 
    };

    return { form, successMessage, submitOrder };
  }
};
</script>

<style scoped>
.form-group {
  margin-bottom: 1.5rem;
}
</style>
