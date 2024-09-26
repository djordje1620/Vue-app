<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-md-6">
        <router-link to="/user/info" class="block-link text-center p-4 mb-3 d-block">
          <h3>User Info</h3>
        </router-link>
      </div>
      <div class="col-md-6">
        <router-link to="/user/purchase" class="block-link text-center p-4 mb-3 d-block">
          <h3>User Purchases</h3>
        </router-link>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'UserView'
};
</script>

<style scoped>
.block-link {
  background-color: #007bff;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.block-link:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.block-link h3 {
  margin: 0;
  font-weight: 600;
}

.block-link:active {
  transform: translateY(0);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
