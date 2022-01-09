<template>
  <fragment>
    <h4 class="title mb-4 text-uppercase">User Details</h4>
    <div class="content text-left">
      <div class="text-center mb-5">
        <div class="d-inline-block position-relative">
          <b-avatar
            :src="entry.profile ? `${url}/${entry.profile}` : ''"
            size="8rem"
            class="mb-3"
            :text="!entry.profile && `${entry.first_name[0]}${entry.last_name[0]}`"
          ></b-avatar>
          <b-badge
            class="position-absolute text-uppercase p-2"
            :variant="!entry.disabled ? 'success' : 'danger'"
            style="border-radius: 50%; bottom: 15%; right: 10%;"
          >
            <span class="d-none">{{ !entry.disabled ? "active" : "inactive"}}</span>
          </b-badge>
        </div>
      </div>
      <b-row>
        <b-col md="4"></b-col>
        <b-col md="4">
          <p class="mb-3 text-muted d-flex justify-content-between">
            <strong class="mr-3">Username</strong>
            <span>
              {{ entry.first_name }}
              {{ entry.last_name }}
            </span>
          </p>
          <p class="mb-3 text-muted d-flex justify-content-between">
            <strong class="mr-3">Email</strong>
            <span>
              {{ entry.email }}
            </span>
          </p>
          <p class="mb-3 text-muted d-flex justify-content-between">
            <strong class="mr-3">Phone</strong>
            <span>
              {{ entry.phone }}
            </span>
          </p>
        </b-col>
        <b-col md="4"></b-col>
      </b-row>
    </div>
  </fragment>
</template>

<script>
import { mapGetters } from 'vuex';
import { Fragment } from 'vue-fragment';
import axios from 'axios';
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
    const entry = await reqInstance.get(`${process.env.API_URL ? process.env.API_URL : 'https://fastapi-kheanglov.cloud.okteto.net'}/users/${params.id}`)
      .then(val => val.data)
      .catch(err => console.log(err));

    return {
      access_token,
      entry,
      url: process.env.API_URL ? process.env.API_URL : 'https://fastapi-kheanglov.cloud.okteto.net'
    };
  },
}
</script>
