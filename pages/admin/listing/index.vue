<template>
  <fragment>
    <b-input-group
      class="mb-3 search-input"
      style="height: 41px;"
    >
      <b-input-group-prepend is-text>
        <b-icon icon="search"></b-icon>
      </b-input-group-prepend>
      <b-form-input
        id="filter-input"
        type="search"
        @change="handleSearch($event)"
        placeholder="Search by (listing_code, property_code)"
        style="height: 41px;"
      ></b-form-input>
    </b-input-group>

    <b-table
      class="text-truncate overflow-auto border-bottom"
      :items="items"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      :filter="filter"
      responsive
    >
      <template #cell(image)="{ item: { property: { image } } }">
        <b-img
          :src="image ? `${url}/${image}` : 'https://picsum.photos/250/250/?image=58'"
          width="50"
          height="50"
          style="object-fit: cover; border-radius: 0.5rem;"
          :alt="image"
        ></b-img>
      </template>
      <template #cell(id)="{ item: { id } }">
        {{ paddString(id) }}
      </template>
      <template #cell(property_id)="{ item: { property: { id } } }">
        <a :href="`/admin/property/${id}`">
          {{ paddString(id) }}
        </a>
      </template>
      <template #cell(sale_price)="{ item: { property: { is_sale }, sale_price } }">
        {{ formatNumber(is_sale ? sale_price : 0, { style: 'currency', currency: 'USD' }) }}
      </template>
      <template #cell(rent_price)="{ item: { property: { is_rent }, rent_price } }">
        {{ formatNumber(is_rent ? rent_price : 0, { style: 'currency', currency: 'USD' }) }}
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
        {{ formatDatetime(created_at) }}
      </template>
      <template #cell(updated_at)="{ item: { updated_at } }">
        {{ formatDatetime(updated_at) }}
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
    <div class="overflow-auto">
      <b-pagination-nav
        class="d-inline-block mr-2"
        :link-gen="linkGen"
        :number-of-pages="pages"
        v-model="page"
        use-router
      >
      </b-pagination-nav>
      <span class="text-muted d-inline-block">Total {{ total }} entries.</span>
    </div>
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

    const { query } = context.route;
    const pg = query.page ? query.page : 1;
    const sz = 10;
    const { items, total, page, size } = await reqInstance.get(`${process.env.API_URL}/listings?page=${pg}&size=${sz}`).then(({ data }) => data);
    const pages = Math.ceil(total / size);
    return {
      access_token,
      fields: [
        { key: 'image', label: 'Image' },
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
      pages,
      total,
      page,
      size,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      url: process.env.API_URL
    };
  },
  watch: {
    async page(val) {
      const reqInstance = axios.create({
        headers: {
          'Authorization': `Bearer ${this.access_token}`
        }
      });

      const { items } = await reqInstance.get(`${this.url}/listings?page=${val}&size=${this.size}`).then(({ data }) => data);
      this.$set(this, 'items', items);
    }
  },
  methods: {
    linkGen(pageNum) {
      return {
        path: '/admin/listing',
        query: { page: pageNum }
      }
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
    async handleSearch(e) {
      const reqInstance = axios.create({
        headers: {
          'Authorization': `Bearer ${this.access_token}`
        }
      });
      let url = `${process.env.API_URL}/listings?page=1&size=10`;
      if (e) {
        url += `&search=${e}`;
      }
      const { items, total, page, size } = await reqInstance.get(url).then(({ data }) => data);
      const pages = Math.ceil(total / size);
      this.$set(this, 'items', items);
      this.$set(this, 'total', total);
      this.$set(this, 'page', page);
      this.$set(this, 'pages', pages);
    }
  }
}
</script>
