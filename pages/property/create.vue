<template>
  <fragment>
    <h4 class="title mb-4 text-uppercase">Create Property</h4>
    <ValidationObserver ref="form">
      <b-form @submit.prevent="handleSubmit" enctype="multipart/form-data">
        <b-row>

          <b-col cols="6">
            <b-form-group
              id="input-group-is-sale"
              label-for="input-is-sale"
            >
              <b-form-checkbox
                v-model="form.is_sale"
              >
                Is Sale
              </b-form-checkbox>
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <b-form-group
              id="input-group-is-rent"
              label-for="input-is-rent"
            >
              <b-form-checkbox
                v-model="form.is_rent"
              >
                Is Rent
              </b-form-checkbox>
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <b-form-group
              v-if="form.is_sale"
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
              v-if="form.is_rent"
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

          <b-col cols="6">
            <b-form-group
              id="input-group-street"
              label="Street No."
              label-for="input-street"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="street_no"
                type="text"
                rules="required"
              >
                <b-form-input
                  id="input-street"
                  v-model="form.street_no"
                  type="text"
                  required
                  placeholder="Enter street no."
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
              id="input-group-house"
              label="House No."
              label-for="input-house"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="house_no"
                type="text"
                rules="required"
              >
                <b-form-input
                  id="input-house"
                  v-model="form.house_no"
                  type="text"
                  placeholder="Enter house no."
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
              id="input-group-address"
              label="Address"
              label-for="input-address"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="address"
                type="text"
                rules="required"
              >
                <b-form-input
                  id="input-address"
                  v-model="form.address"
                  type="text"
                  placeholder="Enter address"
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
              id="input-group-full-address"
              label="Full Address"
              label-for="input-full-address"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="full_address"
                type="text"
                rules="required"
              >
                <b-form-input
                  id="input-full-address"
                  v-model="form.full_address"
                  type="text"
                  placeholder="Enter full address"
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
              id="input-group-lat"
              label="Latitude"
              label-for="input-lat"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="latitude"
                type="text"
                rules="required"
              >
                <b-form-input
                  id="input-lat"
                  v-model="form.latitude"
                  type="text"
                  placeholder="Latitude"
                  :class="errors.length ? 'border-danger' : ''"
                  readonly
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
              id="input-group-lng"
              label="Longitude"
              label-for="input-lng"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="longitude"
                type="text"
                rules="required"
              >
                <b-form-input
                  id="input-lng"
                  v-model="form.longitude"
                  type="text"
                  placeholder="Longitude"
                  :class="errors.length ? 'border-danger' : ''"
                  readonly
                >
                </b-form-input>
                <span v-if="errors.length" class="text-danger">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <GMap
              class="mb-3"
              ref="gMap"
              language="en"
              :center="{lat: 11.5760393, lng: 104.9230512}"
              :zoom="11"
              @click="addMarker($event)"
            >
            </GMap>
          </b-col>

          <b-col cols="6">
            <b-form-group
              id="input-group-width"
              label="Width"
              label-for="input-width"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="land_width"
                type="text"
                rules="required|numeric"
              >
                <b-form-input
                  id="input-width"
                  v-model="form.land_width"
                  type="text"
                  placeholder="Enter width"
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
              id="input-group-length"
              label="Length"
              label-for="input-length"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="land_length"
                type="text"
                rules="required|numeric"
              >
                <b-form-input
                  id="input-length"
                  v-model="form.land_length"
                  type="text"
                  placeholder="Enter length"
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
              id="input-group-area"
              label="Area"
              label-for="input-area"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="land_area"
                type="text"
                rules="required|numeric"
              >
                <b-form-input
                  id="input-area"
                  v-model="form.land_area"
                  type="text"
                  placeholder="Enter area"
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
              id="input-group-image"
              label="Image"
              label-for="input-image"
            >
              <b-form-file id="input-image" accept="image/jpeg, image/png" @change="handleUpload">
                <template slot="file-name" slot-scope="{ names }">
                  <b-badge variant="dark">{{ names[0] }}</b-badge>
                  <b-badge v-if="names.length > 1" variant="dark" class="ml-1">
                    + {{ names.length - 1 }} More files
                  </b-badge>
                </template>
              </b-form-file>
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-form-group
              id="input-group-desc"
              label="Description"
              label-for="input-desc"
            >
              <b-form-textarea
                id="input-desc"
                v-model="form.description"
                placeholder="Enter description"
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>

        <div class="text-left mt-3">
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-link href="/property" class="btn btn-danger">Cancel</b-link>
        </div>
      </b-form>
    </ValidationObserver>
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
  asyncData(context) {
    const access_token = context.store.state.auth.user.access_token;
    return {
      access_token,
      form: {},
      currentLocation: {},
      location: {},
      loaded: false,
      marker: '',
    };
  },
  watch: {
    form: {
      handler(val) {
        if (['land_length'] in val && ['land_width'] in val && val.land_length && val.land_width) {
          this.$set(this.form, 'land_area', (val.land_length * val.land_width));
        } else {
          this.$set(this.form, 'land_area', '');
        }
      },
      deep: true,
    }
  },
  methods: {
    addMarker({ event: { latLng } }) {
      this.$set(this, 'location', { lat: latLng.lat(), lng: latLng.lng() });
      this.location.visible = true;
      if (this.marker) {
        this.marker.setMap(null);
      }
      this.marker = new google.maps.Marker({
          position: latLng,
          map: this.$refs.gMap.map,
      });
      this.$set(this, 'form', { ...this.form, latitude: latLng.lat(), longitude: latLng.lng() })
    },
    handleUpload(e) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        console.log(reader.result);
      };
      reader.onerror = error => {
        console.log('Error: ', error);
      };
    },
    handleSubmit() {
      this.$refs.form.validate()
        .then(async success => {
          if (!success) {
            new Noty({
              text: 'Invild data!',
              type: 'error',
              timeout: 2000
            }).show();
            return false;
          }

          const reqInstance = axios.create({
            headers: {
              'Authorization': `Bearer ${this.access_token}`
            }
          });

          await reqInstance.post(`${process.env.API_URL}/properties`, this.form)
            .then(val => {
              const { data: { success: suc } } = val;
              if (suc) {
                new Noty({
                  text: 'Success create',
                  type: suc ? 'success' : 'error',
                  timeout: 2000
                }).show();
                setTimeout(() => window.location.href = '/property', 2000);
              }

              this.form = {};
              this.confimation = '';
            })
            .catch(err => new Noty({
              text: "We've got some error during request",
              type: suc ? 'success' : 'error',
              timeout: 2000
            }).show());

          this.$nextTick(() => this.$refs.form.reset());
        });
    },
  },
}
</script>
