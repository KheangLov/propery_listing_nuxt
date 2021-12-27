<template>
  <b-row>
    <b-col
      v-for="({ id, sale_price, rent_price }, i) in listings"
      cols="4"
      :key="i"
    >
      <b-link :href="`/listing/${id}`" class="text-info text-decoration-none">
        <b-card
          :title="`Code: ${id.toString().padStart(6, '0')}`"
          style="max-width: 20rem;"
          class="mb-2 border-0 shadow-sm"
        >
          <b-card-text>
            <span v-if="sale_price">
              Sale: {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(sale_price) }}
            </span>
            <span v-if="sale_price && rent_price">-</span>
            <span v-if="rent_price">
              Rent: {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rent_price) }}
            </span>
          </b-card-text>
        </b-card>
      </b-link>
    </b-col>
  </b-row>
</template>

<script>
import axios from 'axios';

export default {
  layout: 'front',
  async asyncData() {
    const listings = await axios.get(`${process.env.API_URL}/listings/front`)
      .then(res => res.data)
      .catch(err => console.log(err));
    return {
      listings,
    };
  },
}
</script>
