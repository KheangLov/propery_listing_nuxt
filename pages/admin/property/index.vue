<template>
  <fragment>
    <div class="d-flex justify-content-between">
      <b-link href="/admin/property/create" class="btn btn-secondary mb-3">
        <b-icon icon="person-plus" aria-hidden="true" class="mr-2"></b-icon>
        <span style="font-size: 18px;">
          Add Property
        </span>
      </b-link>

      <b-form-group
        label-for="filter-input"
        class="mb-0"
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
    </div>

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
      <template #cell(sale_list_price)="{ item: { sale_list_price } }">
        {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(sale_list_price) }}
      </template>
      <template #cell(rent_list_price)="{ item: { rent_list_price } }">
        {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rent_list_price) }}
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
          :variant="status === 'pending' ? 'warning' : (status === 'property' ? 'primary' : 'danger')"
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
      <template #cell(actions)="{ item: { id, status, sale_list_price, rent_list_price } }">
        <b-button
          v-if="['property'].includes(status)"
          variant="link"
          class="text-primary p-0 mr-2"
          @click="modalAction($bvModal, { id, sale_list_price, rent_list_price })"
        >
          <b-icon icon="arrow-repeat" aria-hidden="true"></b-icon>
        </b-button>
        <b-modal
          :id="`modal-convert-listing-${id}`"
          centered
          title="CONVERT TO LISTING"
          @ok="handleOk"
        >
          <ValidationObserver ref="form">
            <b-form @submit.prevent="handleSubmit" enctype="multipart/form-data">
              <b-row>
                <b-col cols="6">
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

                <b-col cols="6">
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
        <b-button v-if="!['reject', 'property'].includes(status)" variant="link" class="text-success p-0 mr-2" @click="updateStatus(id, 'property')">
          <b-icon icon="check2" aria-hidden="true"></b-icon>
        </b-button>
        <b-button v-if="!['reject'].includes(status)" variant="link" class="text-danger p-0 mr-2" @click="updateStatus(id, 'reject')">
          <b-icon icon="arrow-counterclockwise" aria-hidden="true"></b-icon>
        </b-button>
        <b-button variant="link" class="text-secondary p-0 mr-2" :href="`/admin/property/${id}`">
          <b-icon icon="eye" aria-hidden="true"></b-icon>
        </b-button>
        <b-button variant="link" class="text-info p-0 mr-2" :href="`/admin/property/edit/${id}`">
          <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
        </b-button>
        <b-button variant="link" class="text-danger p-0" @click="handleDelete(id)">
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
import moment from 'moment';
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

    const items = await reqInstance.get(`${process.env.API_URL}/properties`).then(val => val.data);
    return {
      access_token,
      fields: [
        { key: 'index', label: 'No.', sortable: true, sortDirection: 'desc' },
        { key: 'id', label: 'Property Code', sortable: true, sortDirection: 'desc' },
        { key: 'sale_list_price', label: 'Sale Price', sortable: true, sortDirection: 'desc' },
        { key: 'rent_list_price', label: 'Rent Price', sortable: true },
        { key: 'is_sale', label: 'Sale', sortable: true },
        { key: 'is_rent', label: 'Rent', sortable: true },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'created_at', label: 'Created At', sortable: true },
        { key: 'updated_at', label: 'Updated At', sortable: true },
        { key: 'actions', label: 'Actions' }
      ],
      items,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      form: {},
    };
  },
  methods: {
    modalAction(modal, form) {
      modal.show(`modal-convert-listing-${form.id}`);
      this.$set(this, 'form', form);
    },
    handleOk() {
      const reqInstance = axios.create({
        headers: {
          'Authorization': `Bearer ${this.access_token}`
        }
      });
      const { id: property_id, sale_list_price: sale_price, rent_list_price: rent_price } = this.form;
      reqInstance.post(`${process.env.API_URL}/listings`, { property_id, sale_price, rent_price })
        .then(() => {
          new Noty({
            text: 'Property successfully converted to listing!',
            type: 'success',
            timeout: 2000
          }).show();
        })
        .catch(err => console.log(err));
    },
    updateStatus(id, status) {
      const reqInstance = axios.create({
        headers: {
          'Authorization': `Bearer ${this.access_token}`
        }
      });
      reqInstance.put(`${process.env.API_URL}/properties/${id}`, { status })
        .then(() => {
          new Noty({
            text: status === 'property' ? 'Property approved' : 'Property rejected',
            type: status === 'property' ? 'success' : 'error',
            timeout: 2000
          }).show();

          const index = _.findIndex(this.items, ['id', id]);
          if (index > -1) {
            this.items[index].status = status;
          }
        })
        .catch(err => console.log(err));
    },
    formatData(val) {
      return moment(val);
    },
    handleDelete(id) {
      const vm = this;
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
    },
  },
}
</script>
