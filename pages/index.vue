<template>
  <div class="outter-wrapper">
    <section class="section-wrapper bg-white">
      <b-container fluid>
        <a
          v-if="isAuthenticated"
          href="javascript:void(0)"
          class="btn btn-lg btn-outline-primary font-weight-bold"
          @click="logout"
        >
          Logout
        </a>
        <b-link
          v-else
          to="/auth/login"
          variant="primary"
          class="btn btn-lg btn-outline-primary font-weight-bold"
        >
          Login
        </b-link>
      </b-container>
    </section>
  </div>
</template>

<script>
// export default {
//   middleware: 'auth',
// }
</script>
