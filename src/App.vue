<template>
  <TheTopNav/>
  <router-view/>
  <TheFooter/>
</template>

<script>

import TheTopNav from './components/TheTopNav.vue'
import TheFooter from './components/TheFooter.vue'

export default {
  name: 'App',
  components: {
    TheTopNav,
    TheFooter
  }
}
</script>

