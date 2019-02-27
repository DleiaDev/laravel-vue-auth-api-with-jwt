<template lang="html">
  <div class="component login">
    <div class="card">

      <div class="card-header">
        <h3>Register</h3>
      </div>

      <div class="card-body">

        <!-- Form -->
        <form @submit.prevent="register">

          <!-- Name -->
          <div class="form-group">
            <label>Name</label>
            <input
              v-model="form.name"
              type="text"
              name="name"
              placeholder="Name"
              class="form-control"
              :class="{ 'is-invalid': form.errors.has('name') }">
            <has-error :form="form" field="name"></has-error>
          </div>

          <!-- Email -->
          <div class="form-group">
            <label>Email</label>
            <input
              v-model="form.email"
              type="email"
              name="email"
              placeholder="Email"
              class="form-control"
              :class="{ 'is-invalid': form.errors.has('email') }">
            <has-error :form="form" field="email"></has-error>
          </div>

          <!-- Password -->
          <div class="form-group">
            <label>Password</label>
            <input
              v-model="form.password"
              type="password"
              name="password"
              placeholder="Password"
              class="form-control"
              :class="{ 'is-invalid': form.errors.has('password') }">
            <has-error :form="form" field="password"></has-error>
          </div>

          <!-- Repeat password -->
          <div class="form-group">
            <label>Repeat password</label>
            <input
              v-model="form.password_confirmation"
              type="password"
              name="password_confirmation"
              placeholder="Repeat password"
              class="form-control"
              :class="{ 'is-invalid': form.errors.has('password_confirmation') }">
            <has-error :form="form" field="password_confirmation"></has-error>
          </div>

          <!-- Submit -->
          <div class="form-group">
            <button type="submit" class="btn btn-primary">Register</button>
          </div>

        </form>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',

  data() {
    return {
      form: new Form({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      })
    }
  },

  methods: {
    register() {
      this.form.post('/api/auth/register')
        .then(() => {
          toast({
            type: 'success',
            title: 'Account created. You can login now.'
          });
        });
    }
  }

}
</script>
