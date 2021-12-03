<template>
  <fragment>
    <h2 class="text-center font-weight-bold text-primary">Login</h2>
    <validation-observer ref="form">
      <b-form @submit.prevent="handleSubmit">
        <b-form-group
          id="input-group-phone"
          label="Phone"
          label-for="input-phone"
        >
          <validation-provider
            v-slot="{ errors }"
            name="phone"
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
          </validation-provider>
        </b-form-group>

        <b-form-group
          id="input-group-password"
          label="Password"
          label-for="input-password"
        >
          <validation-provider
            v-slot="{ errors }"
            name="password"
            type="password"
            rules="required|min:6"
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
          </validation-provider>
        </b-form-group>
        <div class="text-center d-flex mx-auto justify-content-between">
          <b-link to="/auth/login">Forgot password?</b-link>
        </div>
        <b-button type="submit" block variant="outline-primary mt-4">Login</b-button>
      </b-form>
    </validation-observer>
  </fragment>
</template>

<script>
import Noty from 'noty';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { mapGetters } from 'vuex';
export default {
  layout: 'auth',
  middleware: 'guest',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      form: {
        phone: '+85570218869',
        password: '12345678',
        domain: 'web',
      }
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  methods: {
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

          const vm = this;
          await this.$auth.loginWith('local', { data: this.form })
            .then(res => console.log(res))
            .catch(err => {
              let message = 'Error!';
              if (err.response.data && err.response.data.errors) {
                vm.$refs.form.setErrors(err.response.data.errors);
                message = err.response.data.message;
              }

              new Noty({
                text: message,
                type: 'error',
                timeout: 2000
              }).show();
            });
        });
    }
  }
}
</script>
