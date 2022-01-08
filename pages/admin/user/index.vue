<template>
  <fragment>
    <div class="d-flex justify-content-between">
      <b-link href="/admin/user/create" class="btn btn-secondary mb-3">
        <b-icon icon="person-plus" aria-hidden="true" class="mr-2"></b-icon>
        <span style="font-size: 18px;">
          Add User
        </span>
      </b-link>

      <div>
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
            placeholder="Search by (first_name, last_name, email)"
            style="height: 41px;"
          ></b-form-input>
        </b-input-group>
      </div>
    </div>

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
      <template #cell(profile)="{ item: { profile, first_name, last_name } }">
        <b-avatar
          :src="profile ? `${url}/${profile}` : ''"
          size="2rem"
          :text="!profile ? `${first_name[0]}${last_name[0]}` : ''"
        >
        </b-avatar>
      </template>
      <template #cell(disabled)="{ item: { disabled } }">
        <b-badge
          :variant="disabled ? 'danger' : 'success'"
          class="text-uppercase p-2 text-white"
        >
          {{ disabled ? 'inactive' : 'active' }}
        </b-badge>
      </template>
      <template #cell(created_at)="{ item: { created_at } }">
        {{ formatDatetime(created_at) }}
      </template>
      <template #cell(updated_at)="{ item: { updated_at } }">
        {{ formatDatetime(updated_at) }}
      </template>
      <template #cell(actions)="{ item: { id, disabled } }">
        <b-button
          v-if="loggedInUser.id != id"
          variant="link"
          :class="`text-${disabled ? 'success' : 'warning'} p-0 mr-2`"
          @click="handleDisabled(id, !disabled)"
          v-b-tooltip.hover
          :title="disabled ? 'Enable' : 'Disable'"
        >
          <b-icon
            :icon="disabled ? 'unlock' : 'lock'"
            aria-hidden="true"
          >
          </b-icon>
        </b-button>
        <b-button
          variant="link"
          class="text-secondary p-0 mr-2"
          :href="`/admin/user/${id}`"
          v-b-tooltip.hover
          title="View"
        >
          <b-icon icon="eye" aria-hidden="true"></b-icon>
        </b-button>
        <b-button
          variant="link"
          class="text-info p-0 mr-2"
          :href="`/admin/user/edit/${id}`"
          v-b-tooltip.hover
          title="Edit"
        >
          <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
        </b-button>
        <b-button
          v-if="loggedInUser.id != id"
          variant="link"
          class="text-danger p-0"
          @click="handleDelete(id)"
          v-b-tooltip.hover
          title="Delete"
        >
          <b-icon icon="x-square" aria-hidden="true"></b-icon>
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
    const { items, total, page, size } = await reqInstance.get(`${process.env.API_URL}/users?page=${pg}&size=${sz}`).then(({ data }) => data);
    const pages = Math.ceil(total / size);
    return {
      access_token,
      fields: [
        { key: 'profile', label: 'Profile' },
        { key: 'first_name', label: 'Firstname', sortable: true, sortDirection: 'desc' },
        { key: 'last_name', label: 'Lastname', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'phone', label: 'Phone', sortable: true },
        { key: 'disabled', label: 'Status', sortable: true },
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

      const { items } = await reqInstance.get(`${this.url}/users?page=${val}&size=${this.size}`).then(({ data }) => data);
      this.$set(this, 'items', items);
    }
  },
  methods: {
    linkGen(pageNum) {
      return {
        path: '/admin/user',
        query: { page: pageNum }
      }
    },
    async handleDisabled(id, disabled) {
      const reqInstance = axios.create({
        headers: {
          'Authorization': `Bearer ${this.access_token}`
        }
      });

      await reqInstance.put(`${process.env.API_URL}/users/${id}`, { disabled })
        .then(val => {
          const { data: { success: suc, data: { disabled: dis } } } = val;
          if (suc) {
            new Noty({
              text: 'Success update',
              type: suc ? 'success' : 'error',
              timeout: 2000
            }).show();

            const index = _.findIndex(this.items, ['id', id]);
            if (index > -1) {
              this.items[index].disabled = dis;
            }
          }
        })
        .catch(err => new Noty({
          text: "We've got some error during request",
          type: 'error',
          timeout: 2000
        }).show());
    },
    handleDelete(id) {
      const vm = this;
      const dialog = new Noty({
        text: 'Do you really want to delete this property?',
        type: 'error',
        buttons: [
          Noty.button('YES', 'btn btn-secondary', () => {
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
                    type: 'success',
                  }).show();

                vm.items = _.filter(vm.items, o => o.id != id);
              })
              .catch(err => new Noty({
                text: "We've got some error during request!",
                type: 'error',
                timeout: 2000
              }).show());

            dialog.close();
          }, {id: 'button1', 'data-status': 'ok'}),
          Noty.button('NO', 'btn btn-link text-white text-decoration-none', () => dialog.close())
        ]
      });
      dialog.show();
    },
    async handleSearch(e) {
      const reqInstance = axios.create({
        headers: {
          'Authorization': `Bearer ${this.access_token}`
        }
      });
      let url = `${process.env.API_URL}/users?page=1&size=10`;
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
  },
}
</script>
