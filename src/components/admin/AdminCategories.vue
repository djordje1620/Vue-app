<template>
  <div class="container my-5">
    <h2>Categories</h2>

    <!-- Dugme za prikazivanje forme za dodavanje kategorije -->
    <button @click="showAddCategory" class="btn btn-primary mb-3">Add New Category</button>

    <!-- Uslovno prikazivanje AddCategory komponente -->
    <AddCategory v-if="isAdding" @category-added="handleCategoryAdded" />

    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td>{{ category.id }}</td>
          <td>{{ category.name }}</td>
          <td><img :src="category.image" alt="Category Image" style="width: 50px; height: auto;"></td>
          <td>
            <router-link :to="`/dashboard/categories/edit/${category.id}`" class="btn btn-warning btn-sm">Edit</router-link>
            <button @click="confirmDeleteCategory(category.id)" class="btn btn-danger btn-sm">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="message" class="alert alert-warning mt-3">
      {{ message }}
    </div>
  </div>
</template>

<script>
import axios from '../../axios'; 
import AddCategory from './AddCategory.vue';

export default {
  components: {
    AddCategory
  },
  data() {
    return {
      categories: [], // Lista kategorija
      isAdding: false, // Flag za prikazivanje AddCategory komponente
      message: '' // Poruka o grešci ili uspehu
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    showAddCategory() {
      this.isAdding = true; // Prikazivanje AddCategory komponente
    },
    async fetchCategories() {
      console.log('Fetching categories...');
      try {
        const response = await axios.get('/categories');
        this.categories = response.data;
        console.log('Categories fetched:', this.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    handleCategoryAdded(message) {
      this.message = message;
      this.fetchCategories();
    },
    async confirmDeleteCategory(categoryId) {
      try {
        const response = await axios.get(`/categories/${categoryId}/products`);
        if (response.data.length > 0) {
          this.message = 'Cannot delete this category because it contains products.';
          console.log('Cannot delete category:', this.message);
        } else {
          this.deleteCategory(categoryId);
        }
      } catch (error) {
        console.error('Error checking category products:', error);
        this.message = 'Error checking category products.';
        console.log('Error:', this.message);
      }
    },
    async deleteCategory(categoryId) {
      try {
        const response = await axios.delete(`/categories/${categoryId}`);
        if (response.data === true) {
          this.message = 'Category deleted successfully.';
          console.log('Category deleted:', this.message);
          this.fetchCategories(); // Osveži listu kategorija
        }
      } catch (error) {
        console.error('Error deleting category:', error);
        this.message = 'Error deleting category.';
        console.log('Error:', this.message);
      }
    }
  }
};
</script>

<style scoped>
.table {
  margin-top: 20px;
}
.table th, .table td {
  text-align: center;
}
.alert {
  margin-top: 20px;
  padding: 1rem;
  border-radius: .25rem;
  background-color: #f8d7da;
  color: #721c24;
}
</style>
  