<template lang="html">
  <div class="component login">

    <div class="card">
      <div class="card-header">
        <h3>Login</h3>
      </div>
      <div class="card-body">

        <!-- Form -->
        <form @submit.prevent="login">
          <!-- Email -->
          <div class="form-group">
            <label>Email</label>
            <input v-model="form.email" type="email" name="email" placeholder="Email"
            class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
            <has-error :form="form" field="email"></has-error>
          </div>
          <!-- Password -->
          <div class="form-group">
            <label>Password</label>
            <input v-model="form.password" type="password" name="password" placeholder="Password"
            class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
            <has-error :form="form" field="password"></has-error>
          </div>
          <!-- Submit -->
          <div class="form-group">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
          <div class="error mt-2"></div>
        </form>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'login',

  data() {
    return {
      form: new Form({
        email: '',
        password: ''
      })
    }
  },

  methods: {
    login() {
      $('.error').html('');
      this.form.post('/api/auth/login')
        .then(response => {
          var access_token = response.data.access_token;
          axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
          this.$store.commit('login', response.data);
          this.$router.push('/home');
        })
    }
  }

}
</script>
