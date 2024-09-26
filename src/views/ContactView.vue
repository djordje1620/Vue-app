<template>
  <div>
    <!-- Start Content Page -->
    <div class="container-fluid bg-light py-5">
      <div class="col-md-6 m-auto text-center">
        <h1 class="h1">Contact Us</h1>
        <p>
          If you have any questions or need assistance, please do not hesitate to contact us. 
          We are here to help you with any inquiries or support you may require. 
          Fill out the form below, and we will get back to you as soon as possible.
        </p>
      </div>
    </div>

    <!-- Start Contact -->
    <div class="container py-5">
      <div class="row py-5">
        <form @submit.prevent="handleSubmit" class="col-md-9 m-auto">
          <div v-if="successMessage" class="alert alert-success" role="alert">
            {{ successMessage }}
          </div>
          <CustomInput v-model="name" label="Name" id="name" :isValid="nameValid" errorMessage="Name is required." />
          <CustomInput v-model="email" label="Email" type="email" id="email" :isValid="emailValid" errorMessage="Invalid email address." />
          <CustomInput v-model="subject" label="Subject" id="subject" :isValid="subjectValid" errorMessage="Subject is required." />
          <div class="mb-3">
            <label for="message" class="form-label">Message</label>
            <textarea class="form-control mt-1" id="message" v-model="message" placeholder="Message" rows="8"></textarea>
            <div v-if="!messageValid" class="invalid-feedback">Message is required.</div>
          </div>
          <div class="row">
            <div class="col text-end mt-2">
              <button type="submit" class="btn btn-success btn-lg px-3">Let’s Talk</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- End Contact -->
  </div>
</template>

<script>
import CustomInput from '@/components/CustomInput.vue';

export default {
  name: 'ContactView',
  components: {
    CustomInput
  },
  data() {
    return {
      name: '',
      email: '',
      subject: '',
      message: '',
      nameValid: true,
      emailValid: true,
      subjectValid: true,
      messageValid: true,
      successMessage: ''
    };
  },
  methods: {
    validateForm() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      this.nameValid = this.name.trim() !== '';
      this.emailValid = emailPattern.test(this.email.trim());
      this.subjectValid = this.subject.trim() !== '';
      this.messageValid = this.message.trim() !== '';

      return this.nameValid && this.emailValid && this.subjectValid && this.messageValid;
    },
    handleSubmit() {
      if (this.validateForm()) {
        const contactMessage = {
          name: this.name,
          email: this.email,
          subject: this.subject,
          message: this.message,
          timestamp: new Date().toISOString()
        };

        let contactMessages = JSON.parse(localStorage.getItem('contactMessages')) || [];
        contactMessages.push(contactMessage);
        localStorage.setItem('contactMessages', JSON.stringify(contactMessages));

        this.successMessage = 'Your message has been sent!';

        this.name = '';
        this.email = '';
        this.subject = '';
        this.message = '';

        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      }
    }
  }
};
</script>

<style scoped>
.invalid-feedback {
  display: block;
}
</style>
