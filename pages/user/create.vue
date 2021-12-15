<template>
  <fragment>
  </fragment>
</template>

<script>
import { mapGetters } from 'vuex';
import { Fragment } from 'vue-fragment';

export default {
  middleware: 'auth',
  components: {
    Fragment
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
}
</script>
