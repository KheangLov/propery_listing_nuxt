<template>
  <Fragment>
    <h4 class="title mb-4 text-uppercase">Edit Property</h4>
    <b-alert show variant="warning" v-if="reasons.length" class="mb-4">
      <h4 class="alert-heading">Warning!</h4>
      <p>
        There was some problems with this property, please recheck this following errors fields and update it.
      </p>
      <hr>
      <p class="mb-0">
        <strong>Note:</strong>
        **must update all
      </p>
    </b-alert>
    <ValidationObserver ref="form">
      <b-form @submit.prevent="handleSubmit" enctype="multipart/form-data">
        <b-row>

          <b-col md="6">
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

          <b-col md="6">
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

          <b-col md="6">
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
                <span v-if="errors.length || reasons.includes('sale_list_price')" class="text-danger">
                  {{ reasons.includes('sale_list_price') ? 'Invild sale price' : errors[0] }}
                </span>
              </ValidationProvider>
            </b-form-group>
          </b-col>

          <b-col md="6">
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
                <span v-if="errors.length || reasons.includes('rent_list_price')" class="text-danger">
                  {{ reasons.includes('rent_list_price') ? 'Invild rent price' : errors[0] }}
                </span>
              </ValidationProvider>
            </b-form-group>
          </b-col>

          <b-col md="6">
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
                <span v-if="errors.length || reasons.includes('street_no')" class="text-danger">
                  {{ reasons.includes('street_no') ? 'Invalid street no' : errors[0] }}
                </span>
              </ValidationProvider>
            </b-form-group>
          </b-col>

          <b-col md="6">
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
                <span v-if="errors.length || reasons.includes('house_no')" class="text-danger">
                  {{ reasons.includes('house_no') ? 'Invalid house no' : errors[0] }}
                </span>
              </ValidationProvider>
            </b-form-group>
          </b-col>

          <b-col md="12">
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
                <span v-if="errors.length || reasons.includes('full_address')" class="text-danger">
                  {{ reasons.includes('full_address') ? 'Invalid full address' : errors[0] }}
                </span>
              </ValidationProvider>
            </b-form-group>
          </b-col>

          <b-col md="6">
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
                <span v-if="errors.length || reasons.includes('latitude')" class="text-danger">
                  {{ reasons.includes('latitude') ? 'Invalid latitude' : errors[0] }}
                </span>
              </ValidationProvider>
            </b-form-group>
          </b-col>

          <b-col md="6">
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
                <span v-if="errors.length || reasons.includes('longitude')" class="text-danger">
                  {{ reasons.includes('longitude') ? 'Invalid longitude' : errors[0] }}
                </span>
              </ValidationProvider>
            </b-form-group>
          </b-col>

          <b-col md="12">
            <GMap
              class="mb-3"
              ref="gMap"
              language="en"
              :center="{ lat: form.latitude, lng: form.longitude }"
              :options="{ mapTypeId: 'hybrid' }"
              :zoom="14"
              @click="addMarker($event)"
              @loaded="markerAdd({ lat: form.latitude, lng: form.longitude })"
            >
            </GMap>
          </b-col>

          <b-col md="6">
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
                <span v-if="errors.length || reasons.includes('city')" class="text-danger">
                  {{ reasons.includes('city') ? 'Invalid city' : errors[0] }}
                </span>
              </ValidationProvider>
            </b-form-group>
          </b-col>

          <b-col md="6">
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
                <span v-if="errors.length || reasons.includes('district')" class="text-danger">
                  {{ reasons.includes('district') ? 'Invalid district' : errors[0] }}
                </span>
              </ValidationProvider>
            </b-form-group>
          </b-col>

          <b-col md="6">
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
                <span v-if="errors.length || reasons.includes('commune')" class="text-danger">
                  {{ reasons.includes('commune') ? 'Invalid commune' : errors[0] }}
                </span>
              </ValidationProvider>
            </b-form-group>
          </b-col>

          <b-col md="6">
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
              <span v-if="reasons.includes('village')" class="text-danger">
                {{ reasons.includes('village') && 'Invalid village' }}
              </span>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group
              id="input-group-width"
              label="Width"
              label-for="input-width"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="land_width"
                type="text"
                rules="required|numeric|min_value:100"
              >
                <b-form-input
                  id="input-width"
                  v-model="form.land_width"
                  type="text"
                  placeholder="Enter width"
                  :class="errors.length ? 'border-danger' : ''"
                >
                </b-form-input>
                <span v-if="errors.length || reasons.includes('land_width')" class="text-danger">
                  {{ reasons.includes('land_width') ? 'Invalid width' : errors[0] }}
                </span>
              </ValidationProvider>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group
              id="input-group-length"
              label="Length"
              label-for="input-length"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="land_length"
                type="text"
                rules="required|numeric|min_value:100"
              >
                <b-form-input
                  id="input-length"
                  v-model="form.land_length"
                  type="text"
                  placeholder="Enter length"
                  :class="errors.length ? 'border-danger' : ''"
                >
                </b-form-input>
                <span v-if="errors.length || reasons.includes('land_length')" class="text-danger">
                  {{ reasons.includes('land_length') ? 'Invalid length' : errors[0] }}
                </span>
              </ValidationProvider>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group
              id="input-group-area"
              label="Area"
              label-for="input-area"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="land_area"
                type="text"
                rules="required|numeric|min_value:100"
              >
                <b-form-input
                  id="input-area"
                  v-model="form.land_area"
                  type="text"
                  placeholder="Enter area"
                  :class="errors.length ? 'border-danger' : ''"
                >
                </b-form-input>
                <span v-if="errors.length || reasons.includes('land_area')" class="text-danger">
                  {{ reasons.includes('land_area') ? 'Invalid area' : errors[0] }}
                </span>
              </ValidationProvider>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group
              id="input-group-user"
              label="User"
              label-for="input-user"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="user"
                type="text"
                rules="required"
              >
                <b-form-select
                  v-model="form.user_id"
                  :options="users.map(({ first_name, last_name, id }) => ({ value: id, text: `${first_name} ${last_name}` }))"
                >
                  <template #first>
                    <b-form-select-option :value="null" disabled>-- Please select a user --</b-form-select-option>
                  </template>
                </b-form-select>
                <span v-if="errors.length || reasons.includes('user_id')" class="text-danger">
                  {{ reasons.includes('user_id') ? 'Invalid user' : errors[0] }}
                </span>
              </ValidationProvider>
            </b-form-group>
          </b-col>


          <b-col md="6">
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
              <b-img
                v-if="image"
                :src="image.includes('base64,') ? image : `${url}/${image}`"
                fluid
                alt="Image 1"
              >
              </b-img>
              <span v-if="reasons.includes('image')" class="text-danger">
                {{ reasons.includes('image') && 'Invalid image' }}
              </span>
            </b-form-group>
          </b-col>

          <b-col md="12">
            <ValidationProvider
              v-slot="{ errors }"
              name="description"
              type="text"
              rules="required"
            >
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
                <span v-if="errors.length || reasons.includes('description')" class="text-danger">
                  {{ reasons.includes('description') ? 'Invalid description' : errors[0] }}
                </span>
              </b-form-group>
            </ValidationProvider>
          </b-col>
        </b-row>

        <div class="text-left mt-3">
          <b-button type="submit" variant="primary" :disabled="!button_loaded || reasons.length ? true : false">
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
  </Fragment>
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
  // props: ['obj_create', ],
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

    const users = await reqInstance.get(`${process.env.API_URL ? process.env.API_URL : 'https://fastapi-kheanglov.cloud.okteto.net'}/users`).then(val => val.data);
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
      this.$set(this, 'form', { ...this.form, latitude: latLng.lat(), longitude: latLng.lng() })
    },
    handleUpload(e) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        this.$set(this, 'image', reader.result);
        this.$set(this.form, 'image', reader.result.split('base64,')[1]);
      };
      reader.onerror = error => {
        console.log('Error: ', error);
      };
    },
    handleSubmit() {
      this.$set(this, 'button_loaded', false);
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

          await reqInstance.post(`${process.env.API_URL ? process.env.API_URL : 'https://fastapi-kheanglov.cloud.okteto.net'}/properties`, this.form)
            .then(val => {
              const { data: { success: suc } } = val;
              if (suc) {
                new Noty({
                  text: 'Success create',
                  type: suc ? 'success' : 'error',
                  timeout: 2000
                }).show();
                setTimeout(() => window.location.href = '/admin/property', 2000);
              }

              this.form = {};
              this.confimation = '';
            })
            .catch(err =>{
              new Noty({
                text: "We've got some error during request",
                type: suc ? 'success' : 'error',
                timeout: 2000
              }).show();
              this.$set(this, 'button_loaded', true);
            });

          this.$nextTick(() => this.$refs.form.reset());
        });
    },
    getAddress(code = '') {
      const vm = this;
      axios.get(`${process.env.API_URL ? process.env.API_URL : 'https://fastapi-kheanglov.cloud.okteto.net'}/kh_address?code=${code}`)
        .then(res => {
          let key = 'cities';

          if (code.length === 2) {
            key = 'districts';
          } else if (code.length === 4) {
            key = 'communes';
          } else if (code.length === 6) {
            key = 'villages';
          } else if (code.length > 6) {
            return false;
          }

          vm.$set(vm, key, res.data.map(({ code: c, name_en }) => ({ value: c, text: name_en })));
        });
    }
  },
  mounted() {
    this.getAddress();
  }
}
</script>
