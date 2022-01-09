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
                class="mb-2 border-0 shadow-sm card-listing-custom"
                body-class="bg-body-overlay"
                overlay
              >
                <b-card-text
                  text-tag="div"
                  class="text-truncate"
                >
                  <h4>
                    <span class="d-block mb-2 font-weight-bold">
                      {{ is_sale ? 'SALE' : '' }}
                      {{ (is_sale && is_rent) ? '&' : '' }}
                      {{ is_rent ? 'RENT' : '' }}
                    </span>
                    <span
                      v-if="is_sale"
                      v-b-tooltip.hover
                      :title="`Sale: ${formatNumber(sale_price, { style: 'currency', currency: 'USD' })}`"
                    >
                      {{ formatNumber(sale_price, { style: 'currency', currency: 'USD' }) }}
                    </span>
                    <span v-if="is_sale && is_rent"> - </span>
                    <span
                      v-if="rent_price"
                      v-b-tooltip.hover
                      :title="`Rent: ${formatNumber(rent_price, { style: 'currency', currency: 'USD' })}`"
                    >
                      {{ formatNumber(rent_price, { style: 'currency', currency: 'USD' }) }}
                    </span>
                  </h4>
                  <span class="text-white">
                    {{ paddString(id) }}
                  </span>
                  |
                  <span>
                    {{ formatNumber(land_area) }}m<sup>2</sup>
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
                <b-img
                  style="height: 115px;"
                  class="mb-3"
                  :src="image ? `${url}/${image}` : 'https://picsum.photos/600/300/?image=25'"
                  :alt="image ? image : 'https://picsum.photos/600/300/?image=25'"
                  fluid
                />
                <a
                  :href="`/listing/${id}`"
                  class="text-info text-decoration-none"
                >
                  <h6>
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
                  </h6>
                  <span class="text-muted">
                    {{ id.toString().padStart(6, '0') }}
                  </span>
                  |
                  <span>
                    {{ new Intl.NumberFormat().format(land_area) }}m<sup>2</sup>
                  </span>
                </a>
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

  .card-listing-custom {
    overflow: hidden;
    -webkit-transition: .3s ease-in-out;
    -moz-transition: .3s ease-in-out;
    -o-transition: .3s ease-in-out;
    transition: .3s ease-in-out;
    will-change: transform, box-shadow;

    &:hover, &:focus {
      transform: translateY(-4px);

      img {
        -webkit-transition: .3s ease-in-out;
        -moz-transition: .3s ease-in-out;
        -o-transition: .3s ease-in-out;
        transition: .3s ease-in-out;
        transform: scale(1.2);
        -ms-transform: scale(1.2); /* IE 9 */
        -moz-transform: scale(1.2); /* Firefox */
        -webkit-transform: scale(1.2); /* Safari and Chrome */
        -o-transform: scale(1.2); /* Opera */
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
    background-color: rgba(0, 0, 0, 0.4) !important;
  }
</style>

<script>
import axios from 'axios';

export default {
  layout: 'front',
  async asyncData() {
    const listings = await axios.get(`${process.env.API_URL ? process.env.API_URL : 'https://fastapi-kheanglov.cloud.okteto.net'}/listings/front`)
      .then(res => res.data)
      .catch(err => console.log(err));

    return {
      listings,
      url: process.env.API_URL ? process.env.API_URL : 'https://fastapi-kheanglov.cloud.okteto.net',
    };
  },
}
</script>
