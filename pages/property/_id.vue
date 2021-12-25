<template>
  <fragment>
    <h4 class="title mb-4 text-uppercase">Property Details</h4>
    <div class="content text-left">
      <b-row>
        <b-col>
          <p v-if="entry.is_sale" class="mb-3 text-muted d-flex justify-content-between">
            <strong>Sale</strong>
            <b-icon
              icon="check-circle"
              aria-hidden="true"
            ></b-icon>
          </p>
          <p v-if="entry.is_sale" class="mb-3 text-muted d-flex justify-content-between">
            <strong>Sale Price</strong>
            {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(entry.sale_list_price) }}
          </p>
          <p v-if="entry.is_rent" class="mb-3 text-muted d-flex justify-content-between">
            <strong>Rent</strong>
            <b-icon
              icon="check-circle"
              aria-hidden="true"
            ></b-icon>
          </p>
          <p v-if="entry.is_rent" class="mb-3 text-muted d-flex justify-content-between">
            <strong>Rent Price</strong>
            {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(entry.rent_list_price) }}
          </p>
          <p class="mb-3 text-muted d-flex justify-content-between">
            <strong>Longitude</strong>
            {{ entry.longitude }}
          </p>
          <p class="mb-3 text-muted d-flex justify-content-between">
            <strong>Latitude</strong>
            {{ entry.latitude }}
          </p>
          <p class="mb-3 text-muted d-flex justify-content-between">
            <strong>Longitude</strong>
            {{ entry.longitude }}
          </p>
          <p class="mb-3 text-muted d-flex justify-content-between">
            <strong>Address</strong>
            {{ entry.address }}
          </p>
          <p class="mb-3 text-muted d-flex justify-content-between">
            <strong>Full Address</strong>
            {{ entry.full_address }}
          </p>
          <p class="mb-3 text-muted d-flex justify-content-between">
            <strong>Width</strong>
            {{ new Intl.NumberFormat().format(entry.land_width) }}m
          </p>
          <p class="mb-3 text-muted d-flex justify-content-between">
            <strong>Length</strong>
            {{ new Intl.NumberFormat().format(entry.land_length) }}m
          </p>
          <p class="mb-3 text-muted d-flex justify-content-between">
            <strong>Area</strong>
            <span>
              {{ new Intl.NumberFormat().format(entry.land_area) }}m<sup>2</sup>
            </span>
          </p>
          <p class="mb-3 text-muted d-flex justify-content-between">
            <strong>Status</strong>
            <b-badge
              :variant="entry.status === 'pending' ? 'warning' : (entry.status === 'property' ? 'success' : 'danger')"
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
            :center="{ lat: entry.latitude, lng: entry.longitude }"
            :zoom="11"
            @click="addMarker($event)"
          >
            <GMapMarker
              :position="{ lat: entry.latitude, lng: entry.longitude }"
            />
          </GMap>
        </b-col>
      </b-row>
    </div>
  </fragment>
</template>

<script>
import { mapGetters } from 'vuex';
import { Fragment } from 'vue-fragment';
import axios from 'axios';
import Noty from 'noty';
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
  async asyncData({ params, store }) {
    const access_token = store.state.auth.user.access_token;
    const reqInstance = axios.create({
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
    const entry = await reqInstance.get(`${process.env.API_URL}/properties/${params.id}`)
      .then(val => val.data)
      .catch(err => console.log(err));

    return {
      access_token,
      entry,
    };
  },
  methods: {
  },
}
</script>
