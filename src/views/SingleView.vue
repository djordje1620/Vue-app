<template>
  <div v-if="loading" class="text-center my-5">Loading...</div>
  <div v-if="error" class="alert alert-danger">{{ error }}</div>
  <div v-if="!loading && !error" class="container">
    <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
    
    <div class="row my-5">
      <div class="col-md-6">
        <img :src="mainImage" class="img-fluid" alt="Product Image" />
        <div class="row mt-3">
          <div v-for="(image, index) in product.images" :key="index" class="col-4 mb-3">
            <img :src="image" class="img-fluid" alt="Product Image" @click="setMainImage(image)" />
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <h1>{{ product.title }}</h1>
        <h4>{{ product.price }} $</h4>
        <p>{{ product.description }}</p>
        <div>
          <strong>Category:</strong>
          <p>{{ product.category.name }}</p>
        </div>
        <div class="form-group">
          <label for="quantity">Quantity</label>
          <input v-model.number="quantity" type="number" id="quantity" class="form-control" min="1" />
        </div>
        <button @click="addToCart" class="btn btn-primary mt-3">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from '../axios';

export default {
  name: 'SingleView',
  props: ['id'],
  setup(props) {
    const product = ref(null);
    const mainImage = ref('');
    const quantity = ref(1);
    const loading = ref(true);
    const error = ref(null);
    const successMessage = ref(''); // Nova ref za poruku o uspehu

    const fetchProduct = async () => {
      loading.value = true;
      try {
        const response = await axios.get(`/products/${props.id}`);
        const fetchedProduct = response.data;

        // Parsiraj slike ako je ID veći od 51
        if (fetchedProduct.id > 51) {
          try {
            const parsedImages = JSON.parse(fetchedProduct.images);
            if (Array.isArray(parsedImages) && parsedImages.every(item => typeof item === 'string')) {
              fetchedProduct.images = parsedImages;
            } else {
              console.warn('Invalid image format for product with ID:', fetchedProduct.id);
            }
          } catch (error) {
            console.error('Error parsing images for product with ID:', fetchedProduct.id, error);
          }
        }

        product.value = fetchedProduct;
        mainImage.value = product.value.images[0];
      } catch (err) {
        error.value = 'Failed to load product: ' + err.message;
      } finally {
        loading.value = false;
      }
    };

    const setMainImage = (image) => {
      mainImage.value = image;
    };

    const addToCart = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const cartItem = {
        id: product.value.id,
        title: product.value.title,
        price: product.value.price,
        quantity: quantity.value,
      };
      const existingItemIndex = cart.findIndex(item => item.id === product.value.id);
      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += quantity.value;
      } else {
        cart.push(cartItem);
      }
      localStorage.setItem('cart', JSON.stringify(cart));

      successMessage.value = 'Product successfully added to cart!';
      setTimeout(() => {
        window.location.reload();
      }, 1000); 
    };

    onMounted(fetchProduct);

    return { product, mainImage, quantity, loading, error, successMessage, setMainImage, addToCart };
  }
}
</script>

<style scoped>
.img-fluid {
  cursor: pointer;
}
</style>
