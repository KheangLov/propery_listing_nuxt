<template>
  <fragment>
    <h4 class="title mb-4 text-uppercase">Edit User</h4>
    <b-tabs content-class="mt-3">
      <b-tab title="Info" active>
        <ValidationObserver ref="form">
          <b-form @submit.prevent="handleSubmit">
            <b-row>

              <b-col md="6">
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

              <b-col md="6">
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

              <b-col md="6">
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
                      :disabled="loggedInUser.email == form.email"
                    >
                    </b-form-input>
                    <span v-if="errors.length" class="text-danger">
                      {{ errors[0] }}
                    </span>
                  </ValidationProvider>
                </b-form-group>
              </b-col>

              <b-col md="6">
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

              <b-col md="6">
                <b-form-group
                  id="input-group-profile"
                  label="Profile"
                  label-for="input-profile"
                >
                  <b-form-file class="mb-3" id="input-profile" accept="image/jpeg, image/png" @change="handleUpload">
                    <template slot="file-name" slot-scope="{ names }">
                      <b-badge variant="dark">{{ names[0] }}</b-badge>
                      <b-badge v-if="names.length > 1" variant="dark" class="ml-1">
                        + {{ names.length - 1 }} More files
                      </b-badge>
                    </template>
                  </b-form-file>

                  <div class="w-100 text-center">
                    <b-avatar
                      v-if="profile"
                      :src="profile"
                      size="10rem"
                    >
                    </b-avatar>
                  </div>
                </b-form-group>
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
              <b-link href="/admin/user" class="btn btn-danger">
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
      </b-tab>

      <b-tab title="Change Password">
        <ValidationObserver ref="password_form">
          <b-form @submit.prevent="handleChangePassword">
            <b-row>

              <b-col md="6">
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
                      v-model="password_form.password"
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

              <b-col md="6">
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
              <b-link href="/admin/user" class="btn btn-danger">
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
      </b-tab>
    </b-tabs>
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

    const form = await reqInstance.get(`${process.env.API_URL ? process.env.API_URL : 'https://fastapi-kheanglov.cloud.okteto.net'}/users/${params.id}`)
      .then(val => val.data)
      .catch(err => console.log(err));

    const url = process.env.API_URL ? process.env.API_URL : 'https://fastapi-kheanglov.cloud.okteto.net';
    return {
      access_token,
      form: {
        ...form,
      },
      password_form: {},
      confimation: '',
      profile: `${url}/${form.profile}`,
      button_loaded: true,
      url
    };
  },
  methods: {
    handleUpload(e) {
      const reader = new FileReader();
      this.readFileBase64(reader, e.target.files[0], 'profile', 'profile');
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
              'Authorization': `Bearer ${vm.access_token}`
            }
          });

          await reqInstance.put(`${process.env.API_URL ? process.env.API_URL : 'https://fastapi-kheanglov.cloud.okteto.net'}/users/${vm.$route.params.id}`, this.form)
            .then(val => {
              const { data: { success: suc } } = val;
              if (suc) {
                new Noty({
                  text: 'Success update',
                  type: suc ? 'success' : 'error',
                  timeout: 2000
                }).show();
                setTimeout(() => window.location.href = '/admin/user', 2000);
              }
            })
            .catch(err => {
              new Noty({
                text: "We've got some error during request",
                type: 'error',
                timeout: 2000
              }).show();
              this.$set(this, 'button_loaded', true);
            });

          this.$nextTick(() => this.$refs.form.reset());
        });
    },
    handleChangePassword() {
      const vm = this;
      this.$set(this, 'button_loaded', false);
      this.$refs.password_form.validate()
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
              'Authorization': `Bearer ${vm.access_token}`
            }
          });

          await reqInstance.put(`${process.env.API_URL ? process.env.API_URL : 'https://fastapi-kheanglov.cloud.okteto.net'}/change_password/${vm.$route.params.id}`, this.password_form)
            .then(({ status }) => {
              if (status === 200) {
                new Noty({
                  text: 'Success change password',
                  type: 'success',
                  timeout: 2000
                }).show();
                setTimeout(() => window.location.href = '/admin/user', 2000);
              }
            })
            .catch(err => {
              console.log(err);
              new Noty({
                text: "We've got some error during request",
                type: 'error',
                timeout: 2000
              }).show();
              this.$set(this, 'button_loaded', true);
            });

          this.$nextTick(() => this.$refs.form.reset());
        });
    }
  },
}
</script>
