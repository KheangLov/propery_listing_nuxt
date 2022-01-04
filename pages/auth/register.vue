<template>
  <fragment>
    <h2 class="text-center font-weight-bold text-secondary">Register</h2>
    <ValidationObserver ref="form">
      <b-form @submit.prevent="handleCreateUser">
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

        <b-button type="submit" block variant="outline-secondary mt-4" :disabled="!button_loaded">Register</b-button>
      </b-form>
      <div class="text-center mt-2">
        <b-link href="/auth/login" class="text-secondary">Go to login.</b-link>
      </div>
    </ValidationObserver>
  </fragment>
</template>

<script>
// import axios from 'axios';
// import Noty from 'noty';
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { Fragment } from 'vue-fragment';

export default {
  layout: 'auth',
  middleware: 'guest',
  components: {
    Fragment,
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      form: {
        disabled: true,
      },
      confimation: '',
      button_loaded: true,
      profile: '',
      redirect_url: '/auth/login'
    };
  },
  methods: {
    handleUpload(e) {
      const reader = new FileReader();
      this.readFileBase64(reader, e.target.files[0], 'profile', 'profile');
    },
    // handleSubmit() {
    //   this.$set(this, 'button_loaded', false);
    //   this.$refs.form.validate()
    //     .then(async success => {
    //       if (!success) {
    //         new Noty({
    //           text: 'Invild data!',
    //           type: 'error',
    //           timeout: 2000
    //         }).show();
    //         return false;
    //       }

    //       await axios.post(`${process.env.API_URL}/register`, this.form)
    //         .then(({ data: { success: suc, message, field } }) => {
    //           if (!suc) {
    //             new Noty({
    //               text: message ? message : 'Registration failed!',
    //               type: 'error',
    //               timeout: 2000
    //             }).show();
    //             this.$refs.form.setErrors(field);
    //             return false;
    //           }

    //           new Noty({
    //             text: 'Success register',
    //             type: 'success',
    //             timeout: 2000
    //           }).show();
    //           setTimeout(() => window.location.href = '/auth/login', 2000);
    //           this.form = {};
    //           this.confimation = '';
    //           this.$nextTick(() => this.$refs.form.reset());
    //         })
    //         .catch(err => console.log(err));
    //     });
    // }
  },
  mounted() {
    console.log(process.env.API_URL);
  }
}
</script>
