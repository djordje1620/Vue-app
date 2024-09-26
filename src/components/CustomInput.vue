<template>
  <div class="mb-3">
    <label :for="id" class="form-label">{{ label }}</label>
    <div class="input-group">
      <input 
        :type="computedInputType" 
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="form-control" 
        :id="id" 
        :class="{ 'is-invalid': !isValid }" 
      />
      <div v-if="togglePassword" class="input-group-append">
        <button 
          class="btn btn-outline-secondary" 
          type="button" 
          @click="toggleInputType"
        >{{ showPassword ? 'Hide' : 'Show' }}</button>
      </div>
      <div class="invalid-feedback">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
    label: String,
    id: String,
    isValid: Boolean,
    errorMessage: String,
    type: {
      type: String,
      default: 'text'
    },
    togglePassword: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showPassword: false
    };
  },
  computed: {
    computedInputType() {
      return this.togglePassword && this.showPassword ? 'text' : this.type;
    }
  },
  methods: {
    toggleInputType() {
      this.showPassword = !this.showPassword;
    }
  }
};
</script>

<style scoped>
.input-group-append .btn {
  border-radius: 0;
}
</style>
    