<template>
  <fragment>
    <h2 class="title">My Profile</h2>
    <div class="content">
      <b-avatar
        :src="loggedInUser.profile && loggedInUser.profile"
        size="6rem"
        class="mb-3"
        :text="!loggedInUser.profile && `${loggedInUser.first_name[0]}${loggedInUser.last_name[0]}`"
      ></b-avatar>
      <p>
        <strong>Username:</strong>
        {{ loggedInUser.first_name }}
        {{ loggedInUser.last_name }}
      </p>
      <p>
        <strong>Email:</strong>
        {{ loggedInUser.email }}
      </p>
      <p>
        <strong>Phone:</strong>
        {{ loggedInUser.phone }}
      </p>
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
