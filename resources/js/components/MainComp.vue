<template lang="html">
  <div id="main">

    <!-- Navbar -->
    <navbar></navbar>

    <!-- Content -->
    <div class="content container mt-4">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import Navbar from './Navbar.vue';

export default {
  name: 'main-comp',
  components: {Navbar}
}
</script>

<style lang="css">
</style>
