<template>
  <div class="container py-5">
    <h2 class="mb-4">Contact Messages</h2>
    <div v-if="messages.length === 0" class="alert alert-info" role="alert">
      No messages found.
    </div>
    <div v-else>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(msg, index) in messages" :key="index">
            <td>{{ msg.name }}</td>
            <td>{{ msg.email }}</td>
            <td>{{ msg.subject }}</td>
            <td>{{ msg.message }}</td>
            <td>{{ new Date(msg.timestamp).toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessagesList',
  data() {
    return {
      messages: []
    };
  },
  created() {
    this.fetchMessages();
  },
  methods: {
    fetchMessages() {
      const storedMessages = localStorage.getItem('contactMessages');
      if (storedMessages) {
        this.messages = JSON.parse(storedMessages);
      }
    }
  }
};
</script>

<style scoped>
.table th, .table td {
  text-align: center;
}
</style>
