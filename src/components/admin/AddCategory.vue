<template>
  <div class="container my-5">
    <h2>Add Category</h2>
    <form @submit.prevent="handleAdd">
      <div class="form-group">
        <label for="name">Category Name</label>
        <input v-model="name" type="text" id="name" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="image">Category Image URL</label>
        <input v-model="image" type="text" id="image" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">Add Category</button>
    </form>

   
    <div v-if="message" class="alert alert-success mt-3">
      {{ message }}
    </div>
  </div>
</template>

<script>
import axios from '../../axios';

export default {
  name: 'AddCategory',
  data() {
    return {
      name: '',
      image: '',
      message: ''  
    };
  },
  methods: {
    async handleAdd() {
      try {
        const response = await axios.post('/categories/', {
          name: this.name,
          image: this.image
        });
        this.$emit('category-added'); 
        this.name = '';
        this.image = '';
        this.$parent.isAdding = false; 

   
        this.message = 'Category added successfully!';
        console.log('Category added:', response.data);
      } catch (error) {
        console.error('Error adding category:', error);
        this.message = 'Error adding category. Please try again.'; 
      }
    }
  }
};
</script>

<style scoped>
.alert {
  margin-top: 1rem;
}
</style>
