<template>
  <fragment>
    <b-form-group
      label-for="filter-input"
    >
      <b-input-group>
        <b-form-input
          id="filter-input"
          v-model="filter"
          type="search"
          placeholder="Type to Search"
        ></b-form-input>
      </b-input-group>
    </b-form-group>

    <b-table
      class="text-truncate overflow-auto"
      :items="items"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      :filter="filter"
      responsive
    >
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>
      <template #cell(id)="{ item: { id } }">
        {{ id.toString().padStart(6, '0') }}
      </template>
      <template #cell(property_id)="{ item: { property: { id } } }">
        {{ id.toString().padStart(6, '0') }}
      </template>
      <template #cell(sale_price)="{ item: { sale_price } }">
        {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(sale_price) }}
      </template>
      <template #cell(rent_price)="{ item: { rent_price } }">
        {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rent_price) }}
      </template>
      <template #cell(status)="{ item: { status } }">
        <b-badge
          :variant="status === 'inactive' ? 'danger' : 'success'"
          class="text-uppercase p-2 text-white"
        >
          {{ status }}
        </b-badge>
      </template>
      <template #cell(created_at)="{ item: { created_at } }">
        {{ formatData(created_at) }}
      </template>
      <template #cell(updated_at)="{ item: { updated_at } }">
        {{ formatData(updated_at) }}
      </template>
      <template #cell(actions)="{ item: { id, status } }">
        <b-button
          v-if="!['active'].includes(status)"
          variant="link"
          class="text-success p-0 mr-2"
          @click="updateStatus(id, 'active')"
          v-b-tooltip.hover
          title="Approve"
        >
          <b-icon
            icon="check2"
            aria-hidden="true"
          >
          </b-icon>
        </b-button>
        <b-button
          v-else
          variant="link"
          class="text-danger p-0 mr-2"
          @click="updateStatus(id, 'inactive')"
          v-b-tooltip.hover
          title="Reject"
        >
          <b-icon
            icon="arrow-counterclockwise"
            aria-hidden="true"
          >
          </b-icon>
        </b-button>
        <b-button
          variant="link"
          class="text-info p-0"
          :href="`listing/${id}`"
          v-b-tooltip.hover
          title="Edit"
        >
          <b-icon
            icon="eye"
            aria-hidden="true"
          >
          </b-icon>
        </b-button>
      </template>
    </b-table>
  </fragment>
</template>

<script>
import _ from 'lodash';
import moment from 'moment';
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

    const items = await reqInstance.get(`${process.env.API_URL}/listings`).then(val => val.data);
    return {
      access_token,
      fields: [
        { key: 'index', label: 'No.', sortable: true, sortDirection: 'desc' },
        { key: 'id', label: 'Listing Code', sortable: true, sortDirection: 'desc' },
        { key: 'property_id', label: 'Property Code', sortable: true, sortDirection: 'desc' },
        { key: 'sale_price', label: 'Sale Price', sortable: true },
        { key: 'rent_price', label: 'Rent Price', sortable: true },
        { key: 'status', label: 'Status', sortable: true, sortDirection: 'desc' },
        { key: 'created_at', label: 'Created At', sortable: true },
        { key: 'updated_at', label: 'Updated At', sortable: true },
        { key: 'actions', label: 'Actions' }
      ],
      items,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
    };
  },
  methods: {
    formatData(val) {
      return moment(val);
    },
    updateStatus(id, status) {
      const reqInstance = axios.create({
        headers: {
          'Authorization': `Bearer ${this.access_token}`
        }
      });

      let form = { status };

      if (status === 'active') {
        form.approved_by = this.loggedInUser.id;
      }

      reqInstance.put(`${process.env.API_URL}/listings/${id}`, form)
        .then(({ data: { success, message} }) => {
          if (success) {
            new Noty({
              text: status === 'active' ? 'Listing approved' : 'Listing rejected',
              type: status === 'active' ? 'success' : 'error',
              timeout: 2000
            }).show();
            const index = _.findIndex(this.items, ['id', id]);
            if (index > -1) {
              this.items[index].status = status;
            }
          } else {
            new Noty({
              text: message,
              type: 'error',
              timeout: 2000
            }).show();
          }
        })
        .catch(err => console.log(err));
    },
  }
}
</script>
