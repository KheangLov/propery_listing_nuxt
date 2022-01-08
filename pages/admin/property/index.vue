<template>
  <fragment>
    <div class="d-flex justify-content-between">
      <b-link href="/admin/property/create" class="btn btn-secondary mb-3">
        <b-icon icon="person-plus" aria-hidden="true" class="mr-2"></b-icon>
        <span style="font-size: 18px;">
          Add Property
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
            placeholder="Search by code"
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
      <!-- <template #cell(index)="data">
        {{ data.index + 1 }}
      </template> -->
      <template #cell(image)="{ item: { image } }">
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
      <template #cell(sale_list_price)="{ item: { sale_list_price, is_sale } }">
        {{ formatNumber(is_sale ? sale_list_price : 0, { style: 'currency', currency: 'USD' }) }}
      </template>
      <template #cell(rent_list_price)="{ item: { rent_list_price, is_rent } }">
        {{ formatNumber(is_rent ? rent_list_price : 0, { style: 'currency', currency: 'USD' }) }}
      </template>
      <template #cell(is_sale)="{ item: { is_sale } }">
        <b-icon
          :icon="is_sale ? 'check-circle' : 'circle'"
          aria-hidden="true"
        ></b-icon>
      </template>
      <template #cell(is_rent)="{ item: { is_rent } }">
        <b-icon
          :icon="is_rent ? 'check-circle' : 'circle'"
          aria-hidden="true"
        ></b-icon>
      </template>
      <template #cell(status)="{ item: { status } }">
        <b-badge
          :variant="['pending'].includes(status) ? 'warning' : (status === 'property' ? 'primary' : (status === 'listing' ? 'success' : (status === 'listing pending' ? 'info' : 'danger')))"
          class="text-uppercase p-2 text-white"
        >
          {{ status }}
        </b-badge>
      </template>
      <template #cell(user)="{ item: { user } }">
        {{ user.first_name }}
        {{ user.last_name }}
      </template>
      <template #cell(created_at)="{ item: { created_at } }">
        {{ formatDatetime(created_at) }}
      </template>
      <template #cell(updated_at)="{ item: { updated_at } }">
        {{ formatDatetime(updated_at) }}
      </template>
      <template #cell(actions)="{ item: { id, status, is_sale, is_rent, sale_list_price, rent_list_price } }">
        <b-button
          v-if="['property'].includes(status)"
          variant="link"
          class="text-primary p-0 mr-2"
          @click="modalAction($bvModal, { id, sale_list_price, rent_list_price })"
          v-b-tooltip.hover
          title="Convert to listing"
        >
          <b-icon icon="arrow-repeat" aria-hidden="true"></b-icon>
        </b-button>
        <b-modal
          :id="`modal-convert-listing-${id}`"
          centered
          title="CONVERT TO LISTING"
          @ok="handleOk(is_rent, is_sale)"
        >
          <ValidationObserver ref="form">
            <b-form enctype="multipart/form-data">
              <b-row>
                <b-col cols="6" v-if="is_sale">
                  <b-form-group
                    id="input-group-sale-price"
                    label="Sale Price"
                    label-for="input-sale-price"
                  >
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="sale_list_price"
                      type="text"
                      rules="required"
                    >
                      <b-form-input
                        id="input-sale-price"
                        v-model="form.sale_list_price"
                        type="text"
                        placeholder="Enter sale price"
                        :class="errors.length ? 'border-danger' : ''"
                      >
                      </b-form-input>
                      <span v-if="errors.length" class="text-danger">
                        {{ errors[0] }}
                      </span>
                    </ValidationProvider>
                  </b-form-group>
                </b-col>

                <b-col cols="6" v-if="is_rent">
                  <b-form-group
                    id="input-group-rent-price"
                    label="Rent Price"
                    label-for="input-rent-price"
                  >
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="rent_list_price"
                      type="text"
                      rules="required"
                    >
                      <b-form-input
                        id="input-rent-price"
                        v-model="form.rent_list_price"
                        type="text"
                        placeholder="Enter rent price"
                        :class="errors.length ? 'border-danger' : ''"
                      >
                      </b-form-input>
                      <span v-if="errors.length" class="text-danger">
                        {{ errors[0] }}
                      </span>
                    </ValidationProvider>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-form>
          </ValidationObserver>
        </b-modal>
        <b-button
          v-if="!['reject', 'property', 'listing pending', 'listing'].includes(status)"
          variant="link"
          class="text-success p-0 mr-2"
          @click="updateStatus(id, 'property')"
          v-b-tooltip.hover
          title="Approved"
        >
          <b-icon icon="check2" aria-hidden="true"></b-icon>
        </b-button>
        <b-button
          v-if="!['reject', 'listing pending', 'listing'].includes(status)"
          variant="link"
          class="text-danger p-0 mr-2"
          @click="modalRejectAction($bvModal, { id, sale_list_price, rent_list_price })"
          v-b-tooltip.hover
          title="Reject"
        >
          <b-icon icon="arrow-counterclockwise" aria-hidden="true"></b-icon>
        </b-button>
        <b-modal
          :id="`modal-reject-${id}`"
          centered
          title="REJECT REASONS"
          @ok="updateStatus(id, 'reject')"
        >
          <ValidationObserver ref="form">
            <b-form @submit.prevent="handleSubmit" enctype="multipart/form-data">
              <b-row>
                <b-col
                  v-for="(f, k) in field_datas"
                  cols="6"
                  :key="k"
                >
                  <b-form-checkbox
                    v-model="check_fields"
                    :value="f"
                    class="text-capitalize"
                  >
                    {{ f.replace(/_/g, ' ') }}
                  </b-form-checkbox>
                </b-col>
              </b-row>
            </b-form>
          </ValidationObserver>
        </b-modal>
        <b-button
          variant="link"
          class="text-secondary p-0 mr-2"
          :href="`/admin/property/${id}`"
          v-b-tooltip.hover
          title="View"
        >
          <b-icon icon="eye" aria-hidden="true"></b-icon>
        </b-button>
        <b-button
          v-if="!['listing'].includes(status)"
          variant="link"
          class="text-info p-0 mr-2"
          :href="`/admin/property/edit/${id}`"
          v-b-tooltip.hover
          title="Edit"
        >
          <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
        </b-button>
        <b-button
          v-if="!['property', 'listing pending', 'listing'].includes(status)"
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
    const { items, total, page, size } = await reqInstance.get(`${process.env.API_URL}/properties?page=${pg}&size=${sz}`).then(({ data }) => data);
    const pages = Math.ceil(total / size);
    return {
      access_token,
      fields: [
        { key: 'image', label: 'Image' },
        { key: 'id', label: 'Property Code', sortable: true, sortDirection: 'desc' },
        { key: 'sale_list_price', label: 'Sale Price', sortable: true, sortDirection: 'desc' },
        { key: 'rent_list_price', label: 'Rent Price', sortable: true },
        { key: 'is_sale', label: 'Sale', sortable: true },
        { key: 'is_rent', label: 'Rent', sortable: true },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'user', label: 'Owner', sortable: true },
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
      form: {},
      url: process.env.API_URL,
      check_fields: [],
      field_datas: [
        'sale_list_price',
        'rent_list_price',
        'street_no',
        'house_no',
        'city',
        'district',
        'commune',
        'village',
        'full_address',
        'latitude',
        'longitude',
        'land_width',
        'land_length',
        'land_area',
        'description',
        'image',
        'user_id',
      ]
    };
  },
  watch: {
    async page(val) {
      const reqInstance = axios.create({
        headers: {
          'Authorization': `Bearer ${this.access_token}`
        }
      });

      const { items } = await reqInstance.get(`${this.url}/properties?page=${val}&size=${this.size}`).then(({ data }) => data);
      this.$set(this, 'items', items);
    }
  },
  methods: {
    linkGen(pageNum) {
      return {
        path: '/admin/property',
        query: { page: pageNum }
      }
    },
    modalAction(modal, form) {
      modal.show(`modal-convert-listing-${form.id}`);
      this.$set(this, 'form', form);
    },
    modalRejectAction(modal, form) {
      modal.show(`modal-reject-${form.id}`);
    },
    handleOk(is_rent, is_sale) {
      const reqInstance = axios.create({
        headers: {
          'Authorization': `Bearer ${this.access_token}`
        }
      });
      const { id: property_id, sale_list_price: sale_price, rent_list_price: rent_price } = this.form;
      let param = { property_id };

      if (is_rent) {
        param.rent_price = rent_price;
      }
      if (is_sale) {
        param.sale_price = sale_price;
      }

      reqInstance.post(`${process.env.API_URL}/listings`, param)
        .then(({ data: { data: { status } } }) => {
          new Noty({
            text: 'Property successfully converted to listing!',
            type: 'success',
            timeout: 2000
          }).show();
          const index = _.findIndex(this.items, ['id', property_id]);
          if (index > -1) {
            this.items[index].status = status === 'inactive' ? 'listing pending' : 'listing';
          }
        })
        .catch(err => console.log(err));
    },
    updateStatus(id, status) {
      const vm = this;
      const reqInstance = axios.create({
        headers: {
          'Authorization': `Bearer ${this.access_token}`
        }
      });
      const param = { status };
      if (status === 'reject') {
        param.reason = JSON.stringify(this.check_fields);
      }

      reqInstance.put(`${process.env.API_URL}/properties/update_status/${id}`, param)
        .then(async () => {
          new Noty({
            text: status === 'property' ? 'Property approved' : 'Property rejected',
            type: status === 'property' ? 'success' : 'error',
            timeout: 2000
          }).show();

          const index = _.findIndex(this.items, ['id', id]);
          if (index > -1) {
            await reqInstance.get(`${process.env.API_URL}/properties/${id}`)
              .then(({ data: { status: s } }) => vm.items[index].status = s);
          }
        })
        .catch(err => console.log(err));
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

            reqInstance.delete(`${process.env.API_URL}/properties/${id}`)
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
      let url = `${process.env.API_URL}/properties?page=1&size=10`;
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
