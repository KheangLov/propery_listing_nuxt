<template>
  <fragment>
    <b-button variant="primary" class="mb-3">
      <b-icon icon="person-plus" aria-hidden="true" class="mr-2"></b-icon> Add User
    </b-button>
    <b-table
      :items="items"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      responsive
    >
      <template #cell(actions)>
        <b-button variant="link" class="text-info p-0">
          <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
        </b-button>
        <b-button variant="link" class="text-danger p-0">
          <b-icon icon="x-square" aria-hidden="true"></b-icon>
        </b-button>
      </template>
    </b-table>
  </fragment>
</template>

<script>
import axios from 'axios';
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
    let reqInstance = axios.create({
      headers: {
        'Authorization': `Bearer ${context.store.state.auth.user.access_token}`
      }
    });

    const items = await reqInstance.get(`${process.env.API_URL}/users`).then(val => val.data);
    return {
      fields: [
        { key: 'first_name', label: 'Firstname', sortable: true, sortDirection: 'desc' },
        { key: 'last_name', label: 'Lastname', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'phone', label: 'Phone', sortable: true },
        { key: 'actions', label: 'Actions' }
      ],
      items,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
    };
  },
}
</script>
