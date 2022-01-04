<template>
  <fragment>
    <b-card class="border-0 shadow-sm">
      <h4 class="title mb-4 text-uppercase">
        <b-icon icon="list-check" class="mr-2"></b-icon>
        Listing Details
      </h4>
      <div class="content text-left">
        <b-row class="mb-3">
          <b-col md="6">
            <p class="mb-3 text-muted d-flex justify-content-between text-truncate">
              <strong class="mr-3">Listing Code</strong>
              {{ paddString(entry.id) }}
            </p>
            <p class="mb-3 text-muted d-flex justify-content-between text-truncate" v-if="property.is_sale">
              <strong class="mr-3">Sale Price</strong>
              {{ formatNumber(entry.sale_price, { style: 'currency', currency: 'USD' }) }}
            </p>
            <p class="mb-3 text-muted d-flex justify-content-between text-truncate" v-if="property.is_rent">
              <strong class="mr-3">Rent Price</strong>
              {{ formatNumber(entry.rent_price, { style: 'currency', currency: 'USD' }) }}
            </p>
            <p class="mb-3 text-muted d-flex justify-content-between text-truncate">
              <strong class="mr-3">Latitude</strong>
              {{ property.latitude }}
            </p>
            <p class="mb-3 text-muted d-flex justify-content-between text-truncate">
              <strong class="mr-3">Longitude</strong>
              {{ property.longitude }}
            </p>
            <p
              class="mb-3 text-muted d-flex justify-content-between text-truncate"
              v-b-tooltip.hover
              :title="address"
            >
              <strong class="mr-3">Address</strong>
              {{ address }}
            </p>
            <p
              class="mb-3 text-muted d-flex justify-content-between text-truncate"
              v-b-tooltip.hover
              :title="property.full_address"
            >
              <strong class="mr-3">Full Address</strong>
              {{ property.full_address }}
            </p>
            <p class="mb-3 text-muted d-flex justify-content-between text-truncate">
              <strong class="mr-3">Width</strong>
              {{ formatNumber(property.land_width) }}m
            </p>
            <p class="mb-3 text-muted d-flex justify-content-between text-truncate">
              <strong class="mr-3">Length</strong>
              {{ formatNumber(property.land_length) }}m
            </p>
            <p class="mb-3 text-muted d-flex justify-content-between text-truncate">
              <strong class="mr-3">Area</strong>
              <span>
                {{ formatNumber(property.land_area) }}m<sup>2</sup>
              </span>
            </p>
            <p class="mb-3 text-muted d-flex justify-content-between text-truncate">
              <strong class="mr-3">User</strong>
              <span>
                {{ user.first_name }}
                {{ user.last_name }}
              </span>
            </p>
            <p class="mb-3 text-muted d-flex justify-content-between text-truncate">
              <strong class="mr-3">Status</strong>
              <b-badge
                :variant="entry.status === 'inactive' ? 'danger' : 'success'"
                class="text-uppercase p-2 text-white"
              >
                {{ entry.status }}
              </b-badge>
            </p>
          </b-col>
          <b-col md="6">
            <GMap
              class="mb-3"
              ref="gMap"
              language="en"
              :options="{ mapTypeId: 'hybrid' }"
              :center="{ lat: property.latitude, lng: property.longitude }"
              :zoom="14"
              @click="addMarker($event)"
            >
              <GMapMarker
                :position="{ lat: property.latitude, lng: property.longitude }"
              />
            </GMap>
          </b-col>
        </b-row>
        <b-img
          v-if="property.image"
          :src="`${url}/${property.image}`"
          fluid
          class="w-100"
          :alt="property.image"
        >
        </b-img>
      </div>
    </b-card>
  </fragment>
</template>

<script>
import { Fragment } from 'vue-fragment';
import axios from 'axios';

export default {
  layout: 'front',
  components: {
    Fragment,
  },
  async asyncData({ params }) {
    const entry = await axios.get(`${process.env.API_URL}/listings/front/${params.id}`)
      .then(val => val.data)
      .catch(err => console.log(err));

    const address = await axios.get(`${process.env.API_URL}/kh_address/${entry.property.address}`)
        .then(({ data: { path_en } }) => path_en.split(' / ').reverse().join(', '));

    return {
      entry,
      property: entry.property,
      address,
      user: entry.property.user,
      url: process.env.API_URL
    };
  },
}
</script>
