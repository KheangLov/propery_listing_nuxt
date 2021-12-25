<template>
  <fragment>
    <h4 class="title mb-4 text-uppercase">Create Property</h4>
    <ValidationObserver ref="form">
      <b-form @submit.prevent="handleSubmit" enctype="multipart/form-data">
        <b-row>

          <b-col cols="6">
            <b-form-group
              id="input-group-firstname"
              label="Firstname"
              label-for="input-firstname"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="first_name"
                type="text"
                rules="required"
              >
                <b-form-input
                  id="input-firstname"
                  v-model="form.first_name"
                  type="text"
                  required
                  placeholder="Enter firstname"
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
              id="input-group-lastname"
              label="Lastname"
              label-for="input-lastname"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="last_name"
                type="text"
                rules="required"
              >
                <b-form-input
                  id="input-lastname"
                  v-model="form.last_name"
                  type="text"
                  required
                  placeholder="Enter lastname"
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
              id="input-group-email"
              label="Email"
              label-for="input-email"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="email"
                type="email"
                rules="required|email"
              >
                <b-form-input
                  id="input-email"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="Enter email"
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
              id="input-group-email"
              label="Phone"
              label-for="input-email"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="phone"
                type="tel"
                rules="required"
              >
                <b-form-input
                  id="input-phone"
                  v-model="form.phone"
                  type="tel"
                  required
                  placeholder="Enter phone"
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
              id="input-group-password"
              label="Password"
              label-for="input-password"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="password"
                type="password"
                rules="required|min:6|password:@confirm"
              >
                <b-form-input
                  id="input-password"
                  v-model="form.password"
                  type="password"
                  required
                  placeholder="Enter password"
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
              id="input-group-con-password"
              label="Confirm Password"
              label-for="input-con-password"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="confirm"
                type="password"
                rules="required|min:6"
              >
                <b-form-input
                  id="input-con-password"
                  type="password"
                  v-model="confimation"
                  required
                  placeholder="Enter confirm password"
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
              id="input-group-profile"
              label="Profile"
              label-for="input-profile"
            >
              <b-form-file id="input-profile" accept="image/jpeg, image/png" @change="handleUpload">
                <template slot="file-name" slot-scope="{ names }">
                  <b-badge variant="dark">{{ names[0] }}</b-badge>
                  <b-badge v-if="names.length > 1" variant="dark" class="ml-1">
                    + {{ names.length - 1 }} More files
                  </b-badge>
                </template>
              </b-form-file>
            </b-form-group>
          </b-col>

        </b-row>

        <div class="text-left mt-3">
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-link href="/user" class="btn btn-danger">Cancel</b-link>
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
  data() {
    return {
      form: {
        disabled: true,
      },
      confimation: '',
    };
  },
  methods: {
    handleUpload(e) {
      console.log(e.target.files[0]);
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      axios.post(`${process.env.API_URL}/upload_profile`, formData)
        .then(res => console.log(res))
        .catch(err => console.log(err));
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

          await axios.post(`${process.env.API_URL}/register`, this.form)
            .then(val => {
              const { data: { success: suc } } = val;
              if (suc) {
                new Noty({
                  text: 'Success create',
                  type: suc ? 'success' : 'error',
                  timeout: 2000
                }).show();
                setTimeout(() => window.location.href = '/user', 2000);
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
    }
  },
}
</script>
