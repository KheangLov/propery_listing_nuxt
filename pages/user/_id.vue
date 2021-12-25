<template>
  <fragment>
    <h4 class="title mb-4 text-uppercase">User Details</h4>
    <div class="content text-left">
      <div class="text-center mb-5">
        <b-avatar
          :src="entry.profile && entry.profile"
          size="6rem"
          class="mb-3"
          :text="!entry.profile && `${entry.first_name[0]}${entry.last_name[0]}`"
        ></b-avatar>
      </div>
      <b-row>
        <b-col></b-col>
        <b-col>
          <p class="mb-3 text-muted d-flex justify-content-between">
            <strong>Username</strong>
            {{ entry.first_name }}
            {{ entry.last_name }}
          </p>
          <p class="mb-3 text-muted d-flex justify-content-between">
            <strong>Email</strong>
            {{ entry.email }}
          </p>
          <p class="mb-3 text-muted d-flex justify-content-between">
            <strong>Phone</strong>
            {{ entry.phone }}
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
import axios from 'axios';
import Noty from 'noty';
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  middleware: 'auth',
  components: {
    Fragment,
    ValidationObserver,
    ValidationProvider
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  async asyncData({ params, store }) {
    const access_token = store.state.auth.user.access_token;
    const reqInstance = axios.create({
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
    const entry = await reqInstance.get(`${process.env.API_URL}/users/${params.id}`)
      .then(val => val.data)
      .catch(err => console.log(err));

    return {
      access_token,
      entry,
    };
  },
  methods: {
  },
}
</script>
