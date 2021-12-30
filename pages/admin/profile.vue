<template>
  <fragment>
    <h4 class="title mb-4 text-uppercase">My Profile</h4>
    <div class="content text-left">
      <div class="text-center mb-5">
        <div class="d-inline-block position-relative">
          <b-avatar
            :src="loggedInUser.profile && loggedInUser.profile"
            size="8rem"
            class="mb-3 position-relative"
            :text="!loggedInUser.profile && `${loggedInUser.first_name[0]}${loggedInUser.last_name[0]}`"
          >
          </b-avatar>
          <b-badge
            class="position-absolute text-uppercase p-2"
            :variant="!loggedInUser.disabled ? 'success' : 'danger'"
            style="border-radius: 50%; bottom: 15%; right: 10%;"
          >
            <span class="d-none">{{ !loggedInUser.disabled ? "active" : "inactive"}}</span>
          </b-badge>
        </div>
      </div>
      <b-row>
        <b-col></b-col>
        <b-col>
          <p class="mb-3 text-muted d-flex justify-content-between">
            <strong class="mr-3">Username</strong>
            <span>
              {{ loggedInUser.first_name }}
              {{ loggedInUser.last_name }}
            </span>
          </p>
          <p class="mb-3 text-muted d-flex justify-content-between">
            <strong class="mr-3">Email</strong>
            <span>
              {{ loggedInUser.email }}
            </span>
          </p>
          <p class="mb-3 text-muted d-flex justify-content-between">
            <strong class="mr-3">Phone</strong>
            <span>
              {{ loggedInUser.phone }}
            </span>
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
