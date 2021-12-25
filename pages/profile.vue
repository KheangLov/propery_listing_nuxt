<template>
  <fragment>
    <h4 class="title mb-4 text-uppercase">My Profile</h4>
    <div class="content text-left">
      <div class="text-center mb-5">
        <b-avatar
          :src="loggedInUser.profile && loggedInUser.profile"
          size="6rem"
          class="mb-3"
          :text="!loggedInUser.profile && `${loggedInUser.first_name[0]}${loggedInUser.last_name[0]}`"
        ></b-avatar>
      </div>
      <b-row>
        <b-col></b-col>
        <b-col>
          <p class="mb-3 text-muted d-flex justify-content-between">
            <strong>Username</strong>
            {{ loggedInUser.first_name }}
            {{ loggedInUser.last_name }}
          </p>
          <p class="mb-3 text-muted d-flex justify-content-between">
            <strong>Email</strong>
            {{ loggedInUser.email }}
          </p>
          <p class="mb-3 text-muted d-flex justify-content-between">
            <strong>Phone</strong>
            {{ loggedInUser.phone }}
          </p>
        </b-col>
        <b-col></b-col>
      </b-row>
    </div>
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
  }
}
</script>
