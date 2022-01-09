<template>
  <fragment>
    <h4 class="title mb-4 text-uppercase">Create User</h4>
    <ValidationObserver ref="form">
      <b-form @submit.prevent="handleCreateUser" enctype="multipart/form-data">
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
  </fragment>
</template>

<script>
import { mapGetters } from 'vuex';
import { Fragment } from 'vue-fragment';
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
      profile: '',
      button_loaded: true,
      redirect_url: '/admin/user'
    };
  },
  methods: {
    handleUpload(e) {
      const reader = new FileReader();
      this.readFileBase64(reader, e.target.files[0], 'profile', 'profile');
    },
  },
}
</script>
