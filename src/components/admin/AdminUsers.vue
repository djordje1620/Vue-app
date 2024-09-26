<template>
  <div>
    <h2>Users</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.username">
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.status === 'inactive' ? 'Blocked' : 'Active' }}</td>
          <td>
            <button 
              v-if="user.status === 'active' && currentUser.username !== user.username" 
              @click="blockUser(user.username)" 
              class="btn btn-danger btn-sm"
            >
              Block
            </button>
            <button 
              v-if="user.status === 'inactive' && currentUser.username !== user.username" 
              @click="unblockUser(user.username)" 
              class="btn btn-success btn-sm"
            >
              Unblock
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'AdminUsers',
  data() {
    return {
      users: [], 
      currentUser: JSON.parse(localStorage.getItem('currentUser')) || {}
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      this.users = users;
    },
    blockUser(username) {
      this.updateUserStatus(username, 'inactive');
    },
    unblockUser(username) {
      this.updateUserStatus(username, 'active');
    },
    updateUserStatus(username, newStatus) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userIndex = users.findIndex(user => user.username === username);
      if (userIndex !== -1) {
        if (users[userIndex].username !== this.currentUser.username) {
          users[userIndex].status = newStatus; // Ažuriraj status korisnika
          localStorage.setItem('users', JSON.stringify(users));
          this.fetchUsers(); // Osveži listu korisnika
        } else {
          alert('You cannot block or unblock yourself.');
        }
      }
    }
  }
};
</script>

<style scoped>
.table {
  width: 100%;
  margin-top: 20px;
}
.table th, .table td {
  text-align: center;
}
</style>
