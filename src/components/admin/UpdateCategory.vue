<template>
  <div class="container my-5">
    <h2>Edit Category</h2>
    <form @submit.prevent="handleUpdate">
      <div class="form-group">
        <label for="name">Category Name</label>
        <input v-model="category.name" type="text" id="name" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="image">Category Image URL</label>
        <input v-model="category.image" type="text" id="image" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">Update Category</button>
    </form>
    
    <div v-if="message" class="alert alert-success mt-3">
      {{ message }}
    </div>
  </div>
</template>

<script>
import axios from '../../axios';

export default {
  name: 'UpdateCategory',
  data() {
    return {
      category: {
        name: '',
        image: ''
      },
      message: '' 
    };
  },
  async created() {
    await this.fetchCategory();
  },
  methods: {
    async fetchCategory() {
      try {
        const response = await axios.get(`/categories/${this.$route.params.id}`);
        this.category = response.data;
      } catch (error) {
        console.error('Error fetching category:', error);
        this.message = 'Error fetching category.';
      }
    },
    async handleUpdate() {
      try {
        await axios.put(`/categories/${this.$route.params.id}`, {
          name: this.category.name,
          image: this.category.image
        });
        this.message = 'Category updated successfully.';
      } catch (error) {
        console.error('Error updating category:', error);
        this.message = 'Error updating category.';
      }
    }
  }
};
</script>

<style scoped>
.alert {
  margin-top: 20px;
  padding: 1rem;
  border-radius: .25rem;
  background-color: #d4edda;
  color: #155724;
}
</style>
