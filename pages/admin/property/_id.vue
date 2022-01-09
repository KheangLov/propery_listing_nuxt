<template>
  <fragment>
    <h4 class="title mb-4 text-uppercase">Property Details</h4>
    <div class="content text-left">
      <b-row class="mb-3">
        <b-col md="6">
          <p v-if="entry.is_sale" class="mb-3 text-muted d-flex justify-content-between text-truncate">
            <strong class="mr-3">Sale</strong>
            <b-icon
              icon="check-circle"
              aria-hidden="true"
            ></b-icon>
          </p>
          <p v-if="entry.is_sale" class="mb-3 text-muted d-flex justify-content-between text-truncate">
            <strong class="mr-3">Sale Price</strong>
            {{ formatNumber(entry.sale_list_price, { style: 'currency', currency: 'USD' }) }}
          </p>
          <p v-if="entry.is_rent" class="mb-3 text-muted d-flex justify-content-between text-truncate">
            <strong class="mr-3">Rent</strong>
            <b-icon
              icon="check-circle"
              aria-hidden="true"
            ></b-icon>
          </p>
          <p v-if="entry.is_rent" class="mb-3 text-muted d-flex justify-content-between text-truncate">
            <strong class="mr-3">Rent Price</strong>
            {{ formatNumber(entry.rent_list_price, { style: 'currency', currency: 'USD' }) }}
          </p>
          <p class="mb-3 text-muted d-flex justify-content-between text-truncate">
            <strong class="mr-3">Latitude</strong>
            {{ entry.latitude }}
          </p>
          <p class="mb-3 text-muted d-flex justify-content-between text-truncate">
            <strong class="mr-3">Longitude</strong>
            {{ entry.longitude }}
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
            :title="entry.full_address"
          >
            <strong class="mr-3">Full Address</strong>
            {{ entry.full_address }}
          </p>
          <p class="mb-3 text-muted d-flex justify-content-between text-truncate">
            <strong class="mr-3">Width</strong>
            {{ formatNumber(entry.land_width) }}m
          </p>
          <p class="mb-3 text-muted d-flex justify-content-between text-truncate">
            <strong class="mr-3">Length</strong>
            {{ formatNumber(entry.land_length) }}m
          </p>
          <p class="mb-3 text-muted d-flex justify-content-between text-truncate">
            <strong class="mr-3">Area</strong>
            <span>
              {{ formatNumber(entry.land_area) }}m<sup>2</sup>
            </span>
          </p>
          <p class="mb-3 text-muted d-flex justify-content-between text-truncate">
            <strong class="mr-3">Owner</strong>
            <span>
              {{ entry.user.first_name }}
              {{ entry.user.last_name }}
            </span>
          </p>
          <p class="mb-3 text-muted d-flex justify-content-between text-truncate">
            <strong class="mr-3">Status</strong>
            <b-badge
              :variant="['pending'].includes(entry.status) ? 'warning' : (entry.status === 'property' ? 'primary' : (entry.status === 'listing' ? 'success' : (entry.status === 'listing pending' ? 'info' : 'danger')))"
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
            :center="{ lat: entry.latitude, lng: entry.longitude }"
            :zoom="14"
            @click="addMarker($event)"
          >
            <GMapMarker
              :position="{ lat: entry.latitude, lng: entry.longitude }"
            />
          </GMap>
        </b-col>
      </b-row>
      <b-img
        v-if="entry.image"
        :src="`${url}/${entry.image}`"
        fluid
        class="w-100"
        :alt="entry.image"
      >
      </b-img>
    </div>
  </fragment>
</template>

<script>
import { mapGetters } from 'vuex';
import { Fragment } from 'vue-fragment';
import axios from 'axios';
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

    const entry = await reqInstance.get(`${process.env.API_URL ? process.env.API_URL : 'https://fastapi-kheanglov.cloud.okteto.net'}/properties/${params.id}`)
      .then(val => val.data)
      .catch(err => console.log(err));

    return {
      access_token,
      entry,
      user: {},
      address: '',
      url: process.env.API_URL ? process.env.API_URL : 'https://fastapi-kheanglov.cloud.okteto.net'
    };
  },
  methods: {
    getAddress(code) {
      axios.get(`${process.env.API_URL ? process.env.API_URL : 'https://fastapi-kheanglov.cloud.okteto.net'}/kh_address/${code}`)
        .then(({ data: { path_en } }) => this.$set(this, 'address', path_en.split(' / ').reverse().join(', ')));
    }
  },
  mounted() {
    this.getAddress(this.entry.address);
  }
}
</script>
