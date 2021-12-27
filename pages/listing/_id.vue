<template>
  <fragment>
    <b-card class="border-0 shadow-sm">
      <div class="content text-left">
        <b-row>
          <b-col>
            <p class="mb-3 text-muted d-flex justify-content-between">
              <strong class="mr-3">Listing Code</strong>
              {{ entry.id.toString().padStart(6, '0') }}
            </p>
            <p class="mb-3 text-muted d-flex justify-content-between">
              <strong class="mr-3">Sale Price</strong>
              {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(entry.sale_price) }}
            </p>
            <p class="mb-3 text-muted d-flex justify-content-between">
              <strong class="mr-3">Rent Price</strong>
              {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(entry.rent_price) }}
            </p>
            <p class="mb-3 text-muted d-flex justify-content-between">
              <strong class="mr-3">Latitude</strong>
              {{ property.latitude }}
            </p>
            <p class="mb-3 text-muted d-flex justify-content-between">
              <strong class="mr-3">Longitude</strong>
              {{ property.longitude }}
            </p>
            <p class="mb-3 text-muted d-flex justify-content-between">
              <strong class="mr-3">Address</strong>
              {{ address }}
            </p>
            <p class="mb-3 text-muted d-flex justify-content-between">
              <strong class="mr-3">Full Address</strong>
              {{ property.full_address }}
            </p>
            <p class="mb-3 text-muted d-flex justify-content-between">
              <strong class="mr-3">Width</strong>
              {{ new Intl.NumberFormat().format(property.land_width) }}m
            </p>
            <p class="mb-3 text-muted d-flex justify-content-between">
              <strong class="mr-3">Length</strong>
              {{ new Intl.NumberFormat().format(property.land_length) }}m
            </p>
            <p class="mb-3 text-muted d-flex justify-content-between">
              <strong class="mr-3">Area</strong>
              <span>
                {{ new Intl.NumberFormat().format(property.land_area) }}m<sup>2</sup>
              </span>
            </p>
            <p class="mb-3 text-muted d-flex justify-content-between">
              <strong class="mr-3">User</strong>
              <span>
                {{ user.first_name }}
                {{ user.last_name }}
              </span>
            </p>
            <p class="mb-3 text-muted d-flex justify-content-between">
              <strong class="mr-3">Status</strong>
              <b-badge
                :variant="entry.status === 'inactive' ? 'danger' : 'success'"
                class="text-uppercase p-2 text-white"
              >
                {{ entry.status }}
              </b-badge>
            </p>
          </b-col>
          <b-col>
            <GMap
              class="mb-3"
              ref="gMap"
              language="en"
              :center="{ lat: property.latitude, lng: property.longitude }"
              :zoom="11"
              @click="addMarker($event)"
            >
              <GMapMarker
                :position="{ lat: property.latitude, lng: property.longitude }"
              />
            </GMap>
          </b-col>
        </b-row>
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
  async asyncData({ params, store }) {
    const access_token = store.state.auth.user.access_token;
    const entry = await axios.get(`${process.env.API_URL}/listings/front/${params.id}`)
      .then(val => val.data)
      .catch(err => console.log(err));

    const property = await axios.get(`${process.env.API_URL}/properties/front/${entry.property_id}`)
      .then(val => val.data)
      .catch(err => console.log(err));

    const address = await axios.get(`${process.env.API_URL}/kh_address/${property.address}`)
        .then(({ data: { path_en } }) => path_en.split(' / ').reverse().join(', '));

    const user = await axios.get(`${process.env.API_URL}/users/front/${property.user_id}`)
        .then(val => val.data)
        .catch(err => console.log(err));

    return {
      access_token,
      entry,
      user: {},
      property,
      address,
      user,
    };
  },
}
</script>
