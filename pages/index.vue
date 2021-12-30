<template>
  <div>
    <b-tabs
      pills
      content-class="mt-3"
      active-nav-item-class="shadow-sm nav-custom"
    >
      <b-tab
        title="LIST"
        active
        title-item-class="font-weight-bold"
        title-link-class="text-info"
      >
        <b-row>
          <b-col
            v-for="({ id, sale_price, rent_price, property: { image, land_area, is_rent, is_sale } }, i) in listings"
            lg="4"
            md="6"
            class="mb-3"
            :key="i"
          >
            <b-link :href="`/listing/${id}`" class="text-info text-decoration-none">
              <b-card
                :img-src="image ? `${url}/${image}` : 'https://picsum.photos/600/300/?image=25'"
                img-alt="Image"
                img-top
                img-height="225px"
                img-style="object-fit: cover;"
                class="mb-2 border-0 shadow-sm"
                body-class="bg-body-overlay"
                overlay
              >
                <b-card-text class="text-truncate">
                  <h4>
                    <span class="d-block mb-2 font-weight-bold">
                      {{ is_sale && 'SALE' }}
                      {{ (is_sale && is_rent) && '&' }}
                      {{ is_rent && 'RENT' }}
                    </span>
                    <span
                      v-if="sale_price"
                      v-b-tooltip.hover
                      :title="`Sale: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(sale_price)}`"
                    >
                      {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(sale_price) }}
                    </span>
                    <span v-if="sale_price && rent_price"> - </span>
                    <span
                      v-if="rent_price"
                      v-b-tooltip.hover
                      :title="`Rent: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rent_price)}`"
                    >
                      {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rent_price) }}
                    </span>
                  </h4>
                  <span class="text-white">
                    {{ id.toString().padStart(6, '0') }}
                  </span>
                  |
                  <span>
                    {{ new Intl.NumberFormat().format(land_area) }}m<sup>2</sup>
                  </span>
                </b-card-text>
              </b-card>
            </b-link>
          </b-col>
        </b-row>
      </b-tab>
      <b-tab
        title="MAP"
        title-item-class="font-weight-bold"
        title-link-class="text-info"
      >
        <b-card
          class="border-0 shadow-sm bg-white p-0"
          body-class="bg-white"
        >
          <GMap
            class="m-0"
            ref="gMap"
            language="en"
            :center="{lat: 11.5760393, lng: 104.9230512}"
            :zoom="9"
            :options="{ mapTypeId: 'hybrid' }"
          >
            <GMapMarker
              v-for="({ id, rent_price, sale_price, property: { land_area, is_sale, is_rent, image, latitude, longitude } }, k) in listings"
              :position="{ lat: latitude, lng: longitude }"
              :key="k"
            >
              <GMapInfoWindow>
                <b-link :href="`/listing/${id}`" class="text-info text-decoration-none">
                  <b-card
                    :img-src="image ? `${url}/${image}` : 'https://picsum.photos/600/300/?image=25'"
                    img-alt="Image"
                    img-top
                    img-height="225px"
                    img-style="object-fit: cover;"
                    class="mb-2 border-0 shadow-sm"
                    body-class="bg-body-overlay"
                    overlay
                  >
                    <b-card-text class="text-truncate">
                      <h4>
                        <span class="d-block mb-2 font-weight-bold">
                          {{ is_sale && 'SALE' }}
                          {{ (is_sale && is_rent) && '&' }}
                          {{ is_rent && 'RENT' }}
                        </span>
                        <span
                          v-if="sale_price"
                          v-b-tooltip.hover
                          :title="`Sale: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(sale_price)}`"
                        >
                          {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(sale_price) }}
                        </span>
                        <span v-if="sale_price && rent_price"> - </span>
                        <span
                          v-if="rent_price"
                          v-b-tooltip.hover
                          :title="`Rent: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rent_price)}`"
                        >
                          {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rent_price) }}
                        </span>
                      </h4>
                      <span class="text-muted">
                        {{ id.toString().padStart(6, '0') }}
                      </span>
                      |
                      <span>
                        {{ new Intl.NumberFormat().format(land_area) }}m<sup>2</sup>
                      </span>
                    </b-card-text>
                  </b-card>
                </b-link>
              </GMapInfoWindow>
            </GMapMarker>
          </GMap>
        </b-card>
      </b-tab>
    </b-tabs>
  </div>
</template>

<style lang="scss">
  #__nuxt {

    .nav-pills {

      .nav-custom {

        &.active {
          background-color: #fff !important;
        }
      }
    }
  }

  .card, .card-body, .card img {
    border-radius: 0.4rem !important;
  }

  .card-img-top, .card img {
    object-fit: cover !important;
  }

  .bg-body-overlay {
    background-color: rgba(0, 0, 0, 0.5) !important;
  }
</style>

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
      url: process.env.API_URL
    };
  },
}
</script>
