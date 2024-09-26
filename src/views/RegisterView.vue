<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h1 class="card-title text-center">Register</h1>
            <form @submit.prevent="handleRegister" class="needs-validation" novalidate>

              <CustomInput v-model="firstName" label="First Name" id="firstName" :isValid="isFirstNameValid" :errorMessage="firstNameError" />
              
              <CustomInput v-model="lastName" label="Last Name" id="lastName" :isValid="isLastNameValid" :errorMessage="lastNameError" />
              <CustomInput v-model="email" label="Email" type="email" id="email" :isValid="isEmailValid" :errorMessage="emailError" />
              <CustomInput v-model="username" label="Username" id="username" :isValid="isUsernameValid" :errorMessage="usernameError" />
              <CustomInput v-model="password" label="Password" type="password" id="password" :isValid="isPasswordValid" :errorMessage="passwordError" :togglePassword="true" />
              <CustomInput v-model="confirmPassword" label="Confirm Password" type="password" id="confirmPassword" :isValid="isConfirmPasswordValid" :errorMessage="confirmPasswordError" :togglePassword="true" />
              <button type="submit" class="mt-3 btn btn-success w-100">Register</button>
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
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
      isFirstNameValid: true,
      firstNameError: '',
      isLastNameValid: true,
      lastNameError: '',
      isEmailValid: true,
      emailError: '',
      isUsernameValid: true,
      usernameError: '',
      isPasswordValid: true,
      passwordError: '',
      isConfirmPasswordValid: true,
      confirmPasswordError: ''
    };
  },
  methods: {
    ...mapActions(['register']),
    validateFields() {
      this.isFirstNameValid = this.validateName(this.firstName);
      this.isLastNameValid = this.validateName(this.lastName);
      this.isEmailValid = this.validateEmail(this.email);
      this.isUsernameValid = this.validateUsername(this.username);
      this.isPasswordValid = this.validatePassword(this.password);
      this.isConfirmPasswordValid = this.password === this.confirmPassword;
      this.confirmPasswordError = this.isConfirmPasswordValid ? '' : 'Passwords do not match.';

      return this.isFirstNameValid && this.isLastNameValid && this.isEmailValid && this.isUsernameValid && this.isPasswordValid && this.isConfirmPasswordValid;
    },
    validateName(name) {
      const re = /^[A-Z][a-zA-Z]{2,}$/;
      const isValid = re.test(name);
      if (!isValid) {
        if (name.length < 3) {
          this.firstNameError = 'Name must be at least 3 characters long.';
        } else if (!/^[A-Z]/.test(name)) {
          this.firstNameError = 'Name must start with an uppercase letter.';
        } else if (!/^[A-Za-z]+$/.test(name)) {
          this.firstNameError = 'Name must contain only letters.';
        }
      } else {
        this.firstNameError = '';
      }
      return isValid;
    },
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = re.test(String(email).toLowerCase());
      this.emailError = isValid ? '' : 'Please enter a valid email address.';
      return isValid;
    },
    validateUsername(username) {
      const re = /^[A-Z][a-zA-Z0-9!@#$%^&*()+=._-]{2,}$/;
      const isValid = re.test(username);
      this.usernameError = isValid ? '' : 'Username must start with an uppercase letter and can contain numbers or special characters.';
      return isValid;
    },
    validatePassword(password) {
      const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      const isValid = re.test(password);
      this.passwordError = isValid ? '' : 'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
      return isValid;
    },
    async handleRegister() {
      if (!this.validateFields()) {
        this.errorMessage = 'Please correct the errors in the form.';
        return;
      }

      const user = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        username: this.username,
        password: this.password,
        status: 'active', 
        role: 'user'
      };

      try {
        const success = await this.register(user);
        if (success) {
          this.$router.push('/login');
        } else {
          this.errorMessage = 'Registration failed';
        }
      } catch (error) {
        console.error('Registration error:', error);
        this.errorMessage = 'An error occurred during registration.';
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 5rem;
}

.card {
  border-radius: 0.75rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.card-body {
  padding: 2rem;
}

.card-title {
  margin-bottom: 1.5rem;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

.invalid-feedback {
  display: block;
}
</style>
