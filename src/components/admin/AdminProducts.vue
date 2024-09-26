<template>
  <div>
    <h2>Products</h2>

    <AddProduct />

    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Images</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <th scope="row">{{ product.id }}</th>
          <td>{{ product.title }}</td>
          <td>{{ product.price }}$</td>
          <td>
            <div class="images-container">
              <div v-for="(img, index) in product.images" :key="index" class="product-image">
                <img :src="img" alt="Product Image" class="img-thumbnail img-adm" />
              </div>
            </div>
          </td>
          <td>
            <router-link :to="{ name: 'edit-product', params: { id: product.id } }" class="btn btn-primary btn-sm mx-2">Edit</router-link>
            <button @click="deleteProduct(product.id)" class="btn btn-danger btn-sm">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from '../../axios'; 
import AddProduct from './AddProduct.vue';

export default {
  name: 'AdminProducts',
  components: {
    AddProduct
  },
  data() {
    return {
      products: [],
      error: null
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('/products');
        this.products = response.data.map(product => {
         
          if (product.id > 51 ) {
            try {
              product.images = JSON.parse(product.images);
            } catch (e) {
              console.error('Error parsing images:', e);
            }
          }
          return product;
        });
      } catch (error) {
        this.error = 'Error fetching products: ' + error.message;
        console.error('Error fetching products:', error);
      }
    },
    async deleteProduct(productId) {
      try {
        await axios.delete(`/products/${productId}`);
        this.products = this.products.filter(product => product.id !== productId);
      } catch (error) {
        this.error = 'Error deleting product: ' + error.message;
        console.error('Error deleting product:', error);
      }
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
.table {
  margin-top: 20px;
}
.images-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.img-adm {
  width: 100px;
  height: 100px;
}
.product-image {
  flex: 1 1 auto;
}
</style>
