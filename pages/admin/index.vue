<template>
  <div class="outter-wrapper">
    <b-container fluid>
      <h4 class="font-weight-bold mb-3 pb-2 text-uppercase text-muted border-bottom">Properties by status</h4>
      <b-row class="mb-2">
        <b-col v-for="(k, i) in Object.keys(property_count)" :key="i" class="mb-4">
          <b-card
            :bg-variant="k == 'listing' ? 'success' : (
              k == 'listing pending' ? 'info' : (
                k == 'property' ? 'primary' : (
                  k == 'pending' ? 'warning' : 'danger'
                )))"
            text-variant="white"
            class="shadow-sm text-uppercase border-0"
          >
            <b-card-text class="m-0 p-0 d-flex justify-content-between">
              <h4><b-icon icon="house" class="mb-2 d-block"></b-icon></h4>
              <h4 class="mb-0 d-inline-block text-lowercase">
                {{ property_count[k] }} properties
              </h4>
            </b-card-text>
            <h4 class="font-weight-bold mb-0 mr-3 text-truncate">
              {{ k }}
            </h4>
          </b-card>
        </b-col>
      </b-row>

      <h4 class="font-weight-bold mb-3 pb-2 text-uppercase text-muted border-bottom">Users by status</h4>
      <b-row class="mb-2">
        <b-col v-for="(k, i) in Object.keys(user_count)" :key="i" class="mb-4">
          <b-card :bg-variant="k == 'false' ? 'success' : 'danger'" text-variant="white" class="shadow-sm text-uppercase border-0">
            <b-card-text class="m-0 p-0 d-flex justify-content-between">
              <h4><b-icon icon="person" class="mb-2 d-block"></b-icon></h4>
              <h4 class="mb-0 d-inline-block text-lowercase">
                {{ user_count[k] }} users
              </h4>
            </b-card-text>
            <h4 class="font-weight-bold mb-0 mr-3 text-truncate">
              {{ k == 'false' ? 'active' : 'inactive' }}
            </h4>
          </b-card>
        </b-col>
      </b-row>

      <h4 class="font-weight-bold mb-3 pb-2 text-uppercase text-muted border-bottom">Listings by status</h4>
      <b-row class="mb-2">
        <b-col v-for="(k, i) in Object.keys(listing_count)" :key="i" class="mb-4">
          <b-card :bg-variant="k == 'active' ? 'success' : 'danger'" text-variant="white" class="shadow-sm text-uppercase border-0">
            <b-card-text class="m-0 p-0 d-flex justify-content-between">
              <h4><b-icon icon="list-check" class="mb-2 d-block"></b-icon></h4>
              <h4 class="mb-0 d-inline-block text-lowercase">
                {{ listing_count[k] }} listings
              </h4>
            </b-card-text>
            <h4 class="font-weight-bold mb-0 mr-3 text-truncate">
              {{ k }}
            </h4>
          </b-card>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6">
          <h4 class="font-weight-bold mb-2 text-uppercase text-muted">Latest listings</h4>
          <b-table
            class="text-truncate overflow-auto"
            :items="latest_listings"
            :fields="listing_fields"
            responsive
          >
            <template #cell(index)="{ item: { id }, index }">
              <a :href="`/admin/listing/${id}`" class="text-dark text-decoration-none">
                {{ index + 1 }}
              </a>
            </template>
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
              <a :href="`/admin/listing/${id}`">
                {{ paddString(id) }}
              </a>
            </template>
            <template #cell(property_id)="{ item: { property: { id } } }">
              {{ paddString(id) }}
            </template>
            <template #cell(sale_price)="{ item: { property: { is_sale }, sale_price } }">
              {{ formatNumber(is_sale ? sale_price : 0, { style: 'currency', currency: 'USD' }) }}
            </template>
            <template #cell(rent_price)="{ item: { property: { is_rent }, rent_price } }">
              {{ formatNumber(is_rent ? rent_price : 0, { style: 'currency', currency: 'USD' }) }}
            </template>
            <template #cell(created_at)="{ item: { created_at } }">
              {{ formatDatetime(created_at) }}
            </template>
            <template #cell(updated_at)="{ item: { updated_at } }">
              {{ formatDatetime(updated_at) }}
            </template>
            <template #cell(status)="{ item: { status } }">
              <b-badge
                :variant="status === 'inactive' ? 'danger' : 'success'"
                class="text-uppercase p-2 text-white"
              >
                {{ status }}
              </b-badge>
            </template>
          </b-table>
        </b-col>
        <b-col md="6">
          <h4 class="font-weight-bold mb-2 text-uppercase text-muted">Latest properties</h4>
          <b-table
            class="text-truncate overflow-auto"
            :items="latest_properties"
            :fields="property_fields"
            responsive
          >
            <template #cell(index)="{ item: { id }, index }">
              <a :href="`/admin/property/${id}`" class="text-dark text-decoration-none">
                {{ index + 1 }}
              </a>
            </template>
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
              <a :href="`/admin/property/${id}`">
                {{ paddString(id) }}
              </a>
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
            <template #cell(created_at)="{ item: { created_at } }">
              {{ formatDatetime(created_at) }}
            </template>
            <template #cell(updated_at)="{ item: { updated_at } }">
              {{ formatDatetime(updated_at) }}
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
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  async asyncData() {
    const user_count = await axios.get(`${process.env.API_URL ? process.env.API_URL : 'https://fastapi-kheanglov.cloud.okteto.net'}/users_count`)
      .then(({ data }) => data)
      .catch(err => console.error(err));
    const property_count = await axios.get(`${process.env.API_URL ? process.env.API_URL : 'https://fastapi-kheanglov.cloud.okteto.net'}/properties_count`)
      .then(({ data }) => data)
      .catch(err => console.error(err));
    const latest_properties = await axios.get(`${process.env.API_URL ? process.env.API_URL : 'https://fastapi-kheanglov.cloud.okteto.net'}/properties/latest`)
      .then(({ data }) => data)
      .catch(err => console.error(err));
    const listing_count = await axios.get(`${process.env.API_URL ? process.env.API_URL : 'https://fastapi-kheanglov.cloud.okteto.net'}/listings_count`)
      .then(({ data }) => data)
      .catch(err => console.error(err));
    const latest_listings = await axios.get(`${process.env.API_URL ? process.env.API_URL : 'https://fastapi-kheanglov.cloud.okteto.net'}/listings/latest`)
      .then(({ data }) => data)
      .catch(err => console.error(err));
    const address_count = await axios.get(`${process.env.API_URL ? process.env.API_URL : 'https://fastapi-kheanglov.cloud.okteto.net'}/kh_address_count`)
      .then(({ data }) => data)
      .catch(err => console.error(err));


    return {
      url: process.env.API_URL ? process.env.API_URL : 'https://fastapi-kheanglov.cloud.okteto.net',
      latest_properties,
      latest_listings,
      user_count,
      property_count,
      listing_count,
      address_count,
      property_fields: [
        { key: 'index', label: 'No.' },
        { key: 'image', label: 'Image' },
        { key: 'id', label: 'Property Code' },
        { key: 'sale_list_price', label: 'Sale Price' },
        { key: 'rent_list_price', label: 'Rent Price' },
        { key: 'is_sale', label: 'Sale' },
        { key: 'is_rent', label: 'Rent' },
        { key: 'status', label: 'Status' },
        { key: 'user', label: 'Owner' },
        { key: 'created_at', label: 'Created At' },
        { key: 'updated_at', label: 'Updated At' },
      ],
      listing_fields: [
        { key: 'index', label: 'No.' },
        { key: 'image', label: 'Image' },
        { key: 'id', label: 'Listing Code' },
        { key: 'property_id', label: 'Property Code' },
        { key: 'sale_price', label: 'Sale Price' },
        { key: 'rent_price', label: 'Rent Price' },
        { key: 'status', label: 'Status' },
        { key: 'created_at', label: 'Created At' },
        { key: 'updated_at', label: 'Updated At' },
        // { key: 'actions', label: 'Actions' }
      ],
    };
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
}
</script>

<style lang="scss">
  .card {
    border-radius: 0.4rem !important;
  }
</style>
