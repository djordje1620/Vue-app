<template>
  <div class="container my-5 user-info">
    <h2>User Information</h2>
    <div class="info-card">
      <p><strong>First Name:</strong> {{ user.firstName }}</p>
      <p><strong>Last Name:</strong> {{ user.lastName }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Username:</strong> {{ user.username }}</p>
      <p><strong>Role:</strong> {{ user.role }}</p>
      <p><strong>Status:</strong> {{ user.status }}</p>
      <button @click="deleteAccount" class="btn btn-danger mt-3">Delete Account</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data() {
    return {
      user: JSON.parse(localStorage.getItem('currentUser')) || {}
    };
  },
  methods: {
    deleteAccount() {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const updatedUsers = users.filter(user => user.email !== this.user.email);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      localStorage.removeItem('currentUser');
      window.location.href = '/login'; 
    }
  }
};
</script>

<style scoped>
.user-info {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.info-card {
  padding: 20px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.info-card p {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.info-card p + p {
  margin-top: 10px;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
  border-color: #bd2130;
}
</style>
