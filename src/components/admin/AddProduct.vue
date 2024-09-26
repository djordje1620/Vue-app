<template>
  <div class="container">
    <form @submit.prevent="handleAddProduct" class="product-form">
      <h2>Add New Product</h2>
      <div class="form-group">
        <label for="title">Title:</label>
        <input v-model="product.title" type="text" id="title" required />
      </div>
      <div class="form-group">
        <label for="price">Price:</label>
        <input v-model.number="product.price" type="number" id="price" required />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea v-model="product.description" id="description" required></textarea>
      </div>
      <div class="form-group">
        <label for="category">Category:</label>
        <select v-model.number="product.categoryId" id="category" required>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>Images:</label>
        <div v-for="(image, index) in product.images" :key="index" class="image-input-group">
          <input v-model="product.images[index]" type="text" placeholder="Image URL" />
          <button type="button" @click="removeImage(index)" class="remove-button">Remove</button>
        </div>
        <button type="button" @click="addImage" class="add-button">Add Image</button>
      </div>
      <button type="submit" class="submit-button">Add Product</button>
    </form>
  </div>
</template>

<script>
import axios from '../../axios';

export default {
  data() {
    return {
      product: {
        title: '',
        price: null,
        description: '',
        categoryId: null,
        images: [''],
      },
      categories: [] 
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get('/categories');
        this.categories = response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    addImage() {
      this.product.images.push('');
    },
    removeImage(index) {
      this.product.images.splice(index, 1);
    },

    async handleAddProduct() {
      try {
        const productData = {
          title: this.product.title,
          price: this.product.price,
          description: this.product.description,
          categoryId: this.product.categoryId,
          images: this.product.images.filter(img => img.trim() !== ''), // Ukloni prazne URL-ove
        };

        console.log('Sending product data:', productData);

       
        const response = await axios.post('/products', productData);

        // Ispiši odgovor iz API-a (opciono)
        console.log('Product added:', response.data);

        // Očistite formu nakon uspešnog dodavanja proizvoda
        this.product = {
          title: '',
          price: null,
          description: '',
          categoryId: null,
          images: [''],
        };
      } catch (error) {
        console.error('Error adding product:', error);
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.product-form {
  display: flex;
  flex-direction: column;
}

.product-form h2 {
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.image-input-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.image-input-group input {
  flex: 1;
  margin-right: 10px;
}

.remove-button,
.add-button,
.submit-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.remove-button:hover,
.add-button:hover,
.submit-button:hover {
  background-color: #0056b3;
}

.remove-button {
  background-color: #dc3545;
}

</style>
