<template>
  <div>
    <p>Logging out...</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  async created() {
    // Pozovite Vuex akciju za odjavu
    await this.logout();
    // Preusmerite korisnika nakon uspešne odjave
    this.$router.push('/home'); 
  },
  methods: {
    ...mapActions(['logout']),
  },
};
</script>
