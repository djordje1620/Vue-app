<template>
  <div>
    <h2>Update Product</h2>
    <form @submit.prevent="updateProduct">
      <div class="mb-3">
        <label for="id" class="form-label">ID</label>
        <input v-model="product.id" type="text" class="form-control" id="id" disabled />
      </div>
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input v-model="product.title" type="text" class="form-control" id="title" required />
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">Price</label>
        <input v-model="product.price" type="number" class="form-control" id="price" min="0" required />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea v-model="product.description" class="form-control" id="description" rows="5" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Update</button>
      <div v-if="message" class="mt-3" :class="message.type === 'success' ? 'text-success' : 'text-danger'">
        {{ message.text }}
      </div>
    </form>
  </div>
</template>

<script>
import axios from '../../axios';

export default {
  name: 'UpdateProduct',
  data() {
    return {
      product: {
        id: '',
        title: '',
        price: 0,
        description: ''
      },
      message: null 
    };
  },
  async mounted() {
    try {
      const productId = this.$route.params.id;
      const response = await axios.get(`/products/${productId}`);
      this.product = response.data;
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  },
  methods: {
    async updateProduct() {
      if (!this.product.title || !this.product.description || this.product.price < 0) {
        this.message = {
          text: 'All fields must be filled and price cannot be less than 0.',
          type: 'error'
        };
        return;
      }

      try {
        const productId = this.$route.params.id;
        await axios.put(`/products/${productId}`, {
          title: this.product.title,
          price: this.product.price,
          description: this.product.description
        });
        this.message = {
          text: 'Product updated successfully!',
          type: 'success'
        };
      } catch (error) {
        console.error('Error updating product:', error);
        this.message = {
          text: 'Error updating product: ' + error.message,
          type: 'error'
        };
      }
    }
  }
};
</script>

<style scoped>
form {
  max-width: 600px;
  margin: auto;
}
</style>
