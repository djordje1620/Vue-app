<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h1 class="card-title text-center">Login</h1>
            <form @submit.prevent="handleLogin" class="needs-validation" novalidate>
              <CustomInput 
                v-model="username" 
                label="Username" 
                id="username" 
                :isValid="isUsernameValid" 
                :errorMessage="usernameError" 
                @input="validateUsername"
              />
              <CustomInput 
                v-model="password" 
                label="Password" 
                type="password" 
                id="password" 
                :isValid="isPasswordValid" 
                :errorMessage="passwordError" 
                @input="validatePassword"
              />
              <button type="submit" class="btn btn-success w-100">Login</button>
              <p v-if="errorMessage" class="text-danger mt-2 text-center">{{ errorMessage }}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomInput from '@/components/CustomInput.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    CustomInput
  },
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      isUsernameValid: true,
      usernameError: '',
      isPasswordValid: true,
      passwordError: ''
    };
  },
  methods: {
    ...mapActions(['login']),
    validateUsername() {
      const re = /^[A-Z][a-zA-Z0-9!@#$%^&*()+=._-]{2,}$/;
      const isValid = re.test(this.username);
      this.isUsernameValid = isValid;
      this.usernameError = isValid ? '' : 'Username must start with an uppercase letter and can contain numbers or special characters.';
    },
    validatePassword() {
      const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      const isValid = re.test(this.password);
      this.isPasswordValid = isValid;
      this.passwordError = isValid ? '' : 'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
    },
   async handleLogin() {
        this.validateUsername();
        this.validatePassword();

        if (!this.isUsernameValid || !this.isPasswordValid) {
          this.errorMessage = 'Please correct the errors in the form.';
          return;
        }

        const result = await this.login({ username: this.username, password: this.password });

        if (result.startsWith('/')) { // Ako je rezultat ruta
          this.$router.push(result);
        } else {
          this.errorMessage = result; // Ako je rezultat poruka o grešci
        }
      },
        },
};
</script>
