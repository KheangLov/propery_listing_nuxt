<template>
  <fragment>
    <b-link href="/admin/user/create" class="btn btn-secondary mb-3">
      <b-icon icon="person-plus" aria-hidden="true" class="mr-2"></b-icon>
      <span style="font-size: 18px;">
        Add User
      </span>
    </b-link>

    <b-table
      class="text-truncate overflow-auto"
      :items="items"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      responsive
    >
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>
      <template #cell(disabled)="{ item: { disabled } }">
        <b-badge
          :variant="disabled ? 'danger' : 'success'"
          class="text-uppercase p-2 text-white"
        >
          {{ disabled ? 'inactive' : 'active' }}
        </b-badge>
      </template>
      <template #cell(actions)="{ item: { id } }">
        <b-button variant="link" class="text-info p-0" :href="`/admin/user/${id}`">
          <b-icon icon="eye" aria-hidden="true"></b-icon>
        </b-button>
        <b-button variant="link" class="text-info p-0" :href="`/admin/user/edit/${id}`">
          <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
        </b-button>
        <b-button v-if="loggedInUser.id != id" variant="link" class="text-danger p-0" @click="handleDelete(id)">
          <b-icon icon="x-square" aria-hidden="true"></b-icon>
        </b-button>
      </template>
    </b-table>
  </fragment>
</template>

<script>
import _ from 'lodash';
import axios from 'axios';
import Noty from 'noty';
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
  async asyncData(context) {
    const access_token = context.store.state.auth.user.access_token;
    const reqInstance = axios.create({
      headers: {
        'Authorization': `Bearer ${context.store.state.auth.user.access_token}`
      }
    });

    const items = await reqInstance.get(`${process.env.API_URL}/users`).then(val => val.data);
    return {
      access_token,
      fields: [
        { key: 'index', label: 'No.', sortable: true, sortDirection: 'desc' },
        { key: 'first_name', label: 'Firstname', sortable: true, sortDirection: 'desc' },
        { key: 'last_name', label: 'Lastname', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'phone', label: 'Phone', sortable: true },
        { key: 'disabled', label: 'Status', sortable: true },
        { key: 'actions', label: 'Actions' }
      ],
      items,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
    };
  },
  methods: {
    handleDelete(id) {
      const vm = this;
      const reqInstance = axios.create({
        headers: {
          'Authorization': `Bearer ${this.access_token}`
        }
      });

      reqInstance.delete(`${process.env.API_URL}/users/${id}`)
        .then(({ data: { message } }) => {
          if (message)
            new Noty({
              text: message,
              type: message ? 'success' : 'error',
              timeout: 2000
            }).show();

          vm.items = _.filter(vm.items, o => o.id != id);
        })
        .catch(err => new Noty({
          text: "We've got some error during request",
          type: 'error',
          timeout: 2000
        }).show());
    }
  },
}
</script>
