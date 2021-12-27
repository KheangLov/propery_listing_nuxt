<template>
  <fragment>
    <b-navbar
      type="dark"
      variant="info"
      sticky
      class="shadow-sm border-0 m-0"
    >
      <b-container>
        <b-navbar-brand class="front font-weight-bold px-2 text-white text-uppercase">
          <b-link href="/" class="text-white text-decoration-none">P-Listing</b-link>
        </b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <!-- <span class="text-white" v-if="date && time">
            {{ date }} - {{ time }}
          </span> -->
          <b-link
            v-if="!loggedInUser"
            class="text-white text-decoration-none"
            href="/auth/login"
          >
            LOGIN
          </b-link>
          <b-link
            v-else
            class="text-white text-decoration-none"
            href="/admin"
          >
            ADMIN
          </b-link>
        </b-navbar-nav>
      </b-container>
    </b-navbar>
    <b-container fluid class="content-wrapper p-0">
      <b-container class="my-4">
        <Nuxt />
      </b-container>
    </b-container>
  </fragment>
</template>

<style lang="scss">

  #__nuxt {

    .dropdown-menu li .dropdown-item {
      padding-top: 10px;
      padding-bottom: 10px;
    }

    .dropdown-menu li .dropdown-divider {
      margin: 0 !important;
    }

    .dropdown-menu li:first-child .dropdown-item {
      border-top-left-radius: 0.25rem;
      border-top-right-radius: 0.25rem;
    }

    .dropdown-menu li:last-child .dropdown-item {
      border-bottom-left-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
    }

    .dropdown-item:active,
    .nav-pills .nav-link.active {
      background-color: #6c757d !important;
    }

    .navbar .navbar-nav .nav-item.font-weight-normal {

      &:hover, &:focus, &.active {
        background-color: transparent !important;

        .nav-link {
          color: #545b62 !important;
          opacity: 1.0 !important;
        }
      }
    }

    .navbar-light .navbar-nav .nav-item.active,
    .navbar-light .navbar-nav .nav-item:hover,
    .navbar-light .navbar-nav .nav-item:focus {
      background: transparent !important;
    }

    .dropdown-toggle::after {
      display: none !important;
    }

    .content-wrapper .sidebar-menu {
      position: relative !important;
      background-color: #fff !important;
    }

    .top-z-index {
      z-index: 9999 !important;
    }

    .font-weight-normal {
      font-weight: 600 !important;
    }

    .navbar-brand.front {
      font-size: 1.25rem;
      color: #fff !important;
    }

    .custom-img {
      height: 32px;
    }

    .navbar .navbar-nav .nav-item.font-weight-normal .nav-link {
      padding: 0;
      font-size: 18px;
      color: #545b62 !important;
      opacity: 0.75 !important;
    }

    .navbar-light .navbar-nav .nav-item {
      border-radius: 4px;
      padding: 15px 25px;
      margin: 0;
      margin-right: 5px;
      border: 2px solid transparent;
    }

    .navbar-light .navbar-nav .nav-item.active,
    .navbar-light .navbar-nav .nav-item:hover,
    .navbar-light .navbar-nav .nav-item:focus {
      background-color: #eaeaea;
      border: 2px solid transparent;
    }
  }
</style>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      time: '',
      date: '',
      weeks: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    };
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  methods: {
    zeroPadding(num, digit) {
      let zero = '';
      for(let i = 0; i < digit; i++) {
        zero += '0';
      }
      return (zero + num).slice(-digit);
    },
    updateTime() {
      const cd = new Date();
      this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
      this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth()+1, 2) + '-' + this.zeroPadding(cd.getDate(), 2) + ' ' + this.weeks[cd.getDay()];
    }
  },
  // created() {
  //   setInterval(this.updateTime, 1000);
  // }
}
</script>
