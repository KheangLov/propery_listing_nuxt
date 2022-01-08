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
              <ValidationProvider
                v-slot="{ errors }"
                name="is_sale"
                type="text"
              >
                <b-form-checkbox
                  v-model="form.is_sale"
                >
                  Is Sale
                </b-form-checkbox>
                <span v-if="errors.length" class="text-danger">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <b-form-group
              id="input-group-is-rent"
              label-for="input-is-rent"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="is_rent"
                type="text"
              >
                <b-form-checkbox
                  v-model="form.is_rent"
                >
                  Is Rent
                </b-form-checkbox>
                <span v-if="errors.length" class="text-danger">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
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
                rules="required|decimal|min_value:100"
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
                rules="required|decimal|min_value:100"
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

          <b-col cols="12">
            <b-form-group
              id="input-group-full-address"
              label="Full Address"
              label-for="input-full-address"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="full address"
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
                  v-model="latLng.latitude"
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
                  v-model="latLng.longitude"
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
              :options="{ mapTypeId: 'hybrid' }"
              :center="{lat: 11.5760393, lng: 104.9230512}"
              :zoom="14"
              @click="addMarker($event)"
            >
            </GMap>
          </b-col>

          <b-col cols="6">
            <b-form-group
              id="input-group-city"
              label="City"
              label-for="input-city"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="city"
                type="text"
                rules="required"
              >
                <b-form-select
                  :readonly="cities.length ? false : true"
                  v-model="city"
                  :options="cities"
                >
                  <template #first>
                    <b-form-select-option :value="null" disabled>-- Please select a city --</b-form-select-option>
                  </template>
                </b-form-select>
                <span v-if="errors.length" class="text-danger">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <b-form-group
              id="input-group-district"
              label="District"
              label-for="input-district"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="district"
                type="text"
                rules="required"
              >
                <b-form-select
                  :disabled="districts.length ? false : true"
                  v-model="district"
                  :options="districts"
                >
                  <template #first>
                    <b-form-select-option :value="null" disabled>-- Please select a district --</b-form-select-option>
                  </template>
                </b-form-select>
                <span v-if="errors.length" class="text-danger">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <b-form-group
              id="input-group-commune"
              label="Commune"
              label-for="input-commune"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="commune"
                type="text"
                rules="required"
              >
                <b-form-select
                  :disabled="communes.length ? false : true"
                  v-model="commune"
                  :options="communes"
                >
                  <template #first>
                    <b-form-select-option :value="null" disabled>-- Please select a commune --</b-form-select-option>
                  </template>
                </b-form-select>
                <span v-if="errors.length" class="text-danger">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <b-form-group
              id="input-group-village"
              label="Village"
              label-for="input-village"
            >
              <b-form-select
                :disabled="villages.length ? false : true"
                v-model="village"
                :options="villages"
              >
                <template #first>
                  <b-form-select-option :value="null" disabled>-- Please select a village --</b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>
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
                rules="required|decimal|min_value:100"
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
                rules="required|decimal|min_value:100"
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
                rules="required|decimal|min_value:100"
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
              id="input-group-user"
              label="User"
              label-for="input-user"
            >
              <b-form-select
                v-model="form.user_id"
                :options="users.map(({ first_name, last_name, id }) => ({ value: id, text: `${first_name} ${last_name}` }))"
              >
                <template #first>
                  <b-form-select-option :value="null" disabled>-- Please select a user --</b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <ValidationProvider
              v-slot="{ errors }"
              name="image"
              type="text"
            >
              <b-form-group
                id="input-group-image"
                label="Image"
                label-for="input-image"
              >
                <b-form-file class="mb-3" id="input-image" accept="image/jpeg, image/jpg" @change="handleUpload">
                  <template slot="file-name" slot-scope="{ names }">
                    <b-badge variant="dark">{{ names[0] }}</b-badge>
                    <b-badge v-if="names.length > 1" variant="dark" class="ml-1">
                      + {{ names.length - 1 }} More files
                    </b-badge>
                  </template>
                </b-form-file>
                <div class="w-100 text-right">
                  <b-img
                    v-if="image"
                    :src="image"
                    fluid
                    alt="Image 1"
                  ></b-img>
                </div>
                <span v-if="errors.length" class="text-danger">
                  {{ errors[0] }}
                </span>
              </b-form-group>
            </ValidationProvider>
          </b-col>

          <b-col cols="12">
            <!-- <ValidationProvider
              v-slot="{ errors }"
              name="description"
              type="text"
              rules="required"
            > -->
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
                <!-- <span v-if="errors.length" class="text-danger">
                :class="errors.length ? 'border-danger' : ''"
                  {{ errors[0] }}
                </span> -->
              </b-form-group>
            <!-- </ValidationProvider> -->
          </b-col>
        </b-row>

        <div class="text-left mt-3">
          <b-button type="submit" variant="primary" :disabled="!button_loaded">
            <b-icon
              icon="arrow-right-square"
              aria-hidden="true"
            >
            </b-icon>
            Submit
          </b-button>
          <b-link href="/admin/property" class="btn btn-danger">
            <b-icon
              icon="x-circle"
              aria-hidden="true"
            >
            </b-icon>
            Cancel
          </b-link>
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
  async asyncData(context) {
    const access_token = context.store.state.auth.user.access_token;
    const reqInstance = axios.create({
      headers: {
        'Authorization': `Bearer ${context.store.state.auth.user.access_token}`
      }
    });

    const users = await reqInstance.get(`${process.env.API_URL}/all_users`).then(val => val.data);
    return {
      access_token,
      button_loaded: true,
      form: {
        user_id: null,
      },
      currentLocation: {},
      location: {},
      loaded: false,
      marker: '',
      address_code: null,
      cities: [],
      districts: [],
      communes: [],
      villages: [],
      city: null,
      district: null,
      commune: null,
      village: null,
      image: '',
      users,
      latLng: {},
    };
  },
  watch: {
    city(val) {
      this.setAddressCode(val);
    },
    district(val) {
      this.setAddressCode(val);
    },
    commune(val) {
      this.setAddressCode(val);
    },
    village(val) {
      this.setAddressCode(val);
    },
    address_code(val) {
      if (val) {
        if (val.length == 2) {
          this.$set(this, 'district', null);
          this.$set(this, 'commune', null);
          this.$set(this, 'village', null);
          this.$set(this, 'communes', []);
          this.$set(this, 'villages', []);
        } else if (val.length == 4) {
          this.$set(this, 'commune', null);
          this.$set(this, 'village', null);
          this.$set(this, 'villages', []);
        } else if (val.length == 6) {
          this.$set(this, 'village', null);
        }
        if (val.length <= 6) {
          this.getLatLngByAnyLevel(val);
        }
      }
    },
    latLng: {
      handler(val) {
        if (['latitude'] in val && ['longitude'] in val && val.latitude && val.longitude) {
          this.getAddressByLatLng(val.latitude, val.longitude);
          this.$set(this.form, 'latitude', val.latitude);
          this.$set(this.form, 'longitude', val.longitude);
        }
      },
      deep: true,
    },
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
    setAddressCode(code) {
      this.$set(this, 'address_code', code);
      this.$set(this.form, 'address', this.address_code);
      this.getAddress(this.address_code);
    },
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
      this.$set(this, 'latLng', { latitude: latLng.lat(), longitude: latLng.lng() });
    },
    handleUpload(e) {
      const reader = new FileReader();
      this.readFileBase64(reader, e.target.files[0], 'image', 'image');
    },
    handleSubmit() {
      const vm = this;
      this.$set(this, 'button_loaded', false);
      this.$refs.form.validate()
        .then(async success => {
          if (!success) {
            new Noty({
              text: 'Invalid form input!',
              type: 'error',
              timeout: 2000
            }).show();
            this.$set(this, 'button_loaded', true);
            return false;
          }

          const reqInstance = axios.create({
            headers: {
              'Authorization': `Bearer ${this.access_token}`
            }
          });

          this.form.reason = '';
          await reqInstance.post(`${process.env.API_URL}/properties`, this.form)
            .then(({ data: { success: suc, message, detail } }) => {
              if (!suc || detail) {
                new Noty({
                  text: message ? message : 'Create failed!',
                  type: 'error',
                  timeout: 2000
                }).show();

                if (detail && Array.isArray(detail)) {
                  detail.forEach(({ loc, msg }) => this.$refs.form.setErrors({ [loc[loc.length - 1]]: msg }));
                }

                return false;
              }

              new Noty({
                text: 'Success create',
                type: 'success',
                timeout: 2000
              }).show();
              setTimeout(() => window.location.href = '/admin/property', 2000);

              this.form = {};
              this.confimation = '';
              this.$nextTick(() => this.$refs.form.reset());
            })
            .catch(err => {
              let message = "We've got some error during request";
              if (err.response.data && err.response.data.detail) {
                const { detail } = err.response.data;
                if (detail && Array.isArray(detail)) {
                  detail.forEach(({ loc, msg }) => vm.$refs.form.setErrors({ [loc[loc.length - 1]]: msg }));
                } else {
                  message = err.response.data.detail;
                }
              }

              new Noty({
                text: message,
                type: 'error',
                timeout: 2000
              }).show();

              this.$set(this, 'button_loaded', true);
            });
        });
    },
  },
  mounted() {
    this.getAddress();
  }
}
</script>
