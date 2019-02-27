<template lang="html">
  <div class="component home">
    <h1>You are logged in!</h1>
    <button type="button" class="btn btn-primary mt-2" @click="test">Test</button>
  </div>
</template>

<script>
export default {
  created() {
    if (this.$store.getters.message) {
      toast({
        type: 'success',
        title: this.$store.getters.message
      });
      this.$store.commit('resetMessage');
    }
  },

  methods: {
    test() {
      axios.get('/api/test');
    }
  }
}
</script>

<style lang="css">
</style>
