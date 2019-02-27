<template lang="html">
  <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
    <div class="container">

      <!-- Logo -->
      <router-link to="/" class="navbar-brand">Laravel Vue SPA with API authentication</router-link>

      <!-- Mobile menu icon -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Rest of navbar -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <!-- Left Side Of Navbar -->
        <ul class="navbar-nav mr-auto"></ul>

        <!-- Right Side Of Navbar -->
        <ul class="navbar-nav ml-auto">
          <template v-if="!currentUser">
            <li>
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
            <li>
              <router-link to="/register" class="nav-link">Register</router-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-toggle="dropdown" id="userDropdown" href="#" role="button" aria-expanded="false" aria-haspopup="true">
                {{ currentUser.user.name }} <span class="caret"></span>
              </a>
              <div class="dropdown-menu" aria-labelledby="userDropdown">
                <a href="#" class="dropdown-item" @click.prevent="logout">Logout</a>
              </div>
            </li>
          </template>
        </ul>

      </div>

    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',

  methods: {
    logout() {
      axios.post('/api/auth/logout')
        .then(response => {
          axios.defaults.headers.common['Authorization'] = null;
          this.$store.commit('logout');
          this.$router.push('/login');
        });
    }
  },

  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    }
  }
}
</script>
