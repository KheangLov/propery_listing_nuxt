<template>
  <div class="outter-wrapper">
    <b-container fluid>
      <b-card-group deck>
        <b-card bg-variant="primary" text-variant="white" class="shadow-sm text-uppercase">
          <b-card-text class="m-0 p-0 d-flex justify-content-between">
            <h4><b-icon icon="person" class="mb-2 d-block"></b-icon></h4>
            <h4 class="mb-0 d-inline-block">
              {{ user_count ? new Intl.NumberFormat().format(user_count) : 0 }}
            </h4>
          </b-card-text>
          <h4 class="font-weight-bold mb-0 mr-3">Users</h4>
        </b-card>
        <b-card bg-variant="secondary" text-variant="white" class="shadow-sm text-uppercase">
          <b-card-text class="m-0 p-0 d-flex justify-content-between">
            <h4><b-icon icon="house" class="mb-2 d-block"></b-icon></h4>
            <h4 class="mb-0 d-inline-block">
              {{ property_count ? new Intl.NumberFormat().format(property_count) : 0 }}
            </h4>
          </b-card-text>
          <h4 class="font-weight-bold mb-0 mr-3">Properties</h4>
        </b-card>
        <b-card bg-variant="info" text-variant="white" class="shadow-sm text-uppercase">
          <b-card-text class="m-0 p-0 d-flex justify-content-between">
            <h4><b-icon icon="list-check" class="mb-2 d-block"></b-icon></h4>
            <h4 class="mb-0 d-inline-block">
              {{ listing_count ? new Intl.NumberFormat().format(listing_count) : 0 }}
            </h4>
          </b-card-text>
          <h4 class="font-weight-bold mb-0 mr-3">Listings</h4>
        </b-card>
        <b-card bg-variant="dark" text-variant="white" class="shadow-sm text-uppercase">
          <b-card-text class="m-0 p-0 d-flex justify-content-between">
            <h4><b-icon icon="card-heading" class="mb-2 d-block"></b-icon></h4>
            <h4 class="mb-0">
              {{ address_count ? new Intl.NumberFormat().format(address_count) : 0 }}
            </h4>
          </b-card-text>
          <b-card-text class="m-0 p-0">
            <h4 class="font-weight-bold mb-0 mr-3">
              Addresses
            </h4>
          </b-card-text>
        </b-card>
      </b-card-group>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  async asyncData() {
    const user_count = await axios.get(`${process.env.API_URL}/users_count`)
      .then(({ data }) => data)
      .catch(err => console.error(err));
    const property_count = await axios.get(`${process.env.API_URL}/properties_count`)
      .then(({ data }) => data)
      .catch(err => console.error(err));
    const listing_count = await axios.get(`${process.env.API_URL}/listings_count`)
      .then(({ data }) => data)
      .catch(err => console.error(err));
    const address_count = await axios.get(`${process.env.API_URL}/kh_address_count`)
      .then(({ data }) => data)
      .catch(err => console.error(err));


    return {
      user_count,
      property_count,
      listing_count,
      address_count,
    };
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
}
</script>
