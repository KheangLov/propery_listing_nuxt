<template>
  <div class="outter-wrapper">
    <b-container fluid>
      <h4>Dashboard</h4>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['loggedInUser'])
  }
}
</script>
