<template>
  <div>
    <div v-if="!loaded" class="preload">
      <div class="pulse"></div>
    </div>
    <b-navbar
      type="dark"
      variant="info"
      sticky
      class="shadow border-0 m-0"
    >
      <b-container>
        <b-navbar-brand class="front font-weight-bold px-2 text-white text-uppercase">
          <b-link href="/" class="text-white text-decoration-none" style="font-size: 26px;">P-Listing</b-link>
        </b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-item link-classes="p-3">
            <span class="text-white" v-if="date && time">
              {{ date }} - {{ time }}
            </span>
          </b-nav-item>
          <b-nav-item
            v-if="!loggedInUser"
            link-classes="p-3 text-white text-decoration-none"
            href="/auth/login"
          >
            LOGIN
          </b-nav-item>
          <b-nav-item-dropdown
            v-else
            right
            class="p-0"
            menu-class="border-0 shadow-sm p-0"
          >
            <template
              #button-content
            >
              <b-avatar
                :src="loggedInUser.profile ? loggedInUser.profile : ''"
                :text="!loggedInUser.profile ? `${loggedInUser.first_name[0]}${loggedInUser.last_name[0]}` : ''"
              ></b-avatar>
            </template>
            <b-dropdown-item disabled>
              {{ loggedInUser.first_name }}
              {{ loggedInUser.last_name }}
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item
              href="/admin"
            >
              <b-icon icon="x-diamond" aria-hidden="true" class="mr-2"></b-icon>
              Go to admin
            </b-dropdown-item>
            <b-dropdown-item
              v-if="isAuthenticated"
              href="javascript:void(0)"
              @click="logout"
            >
              <b-icon icon="arrow-left-circle" aria-hidden="true" class="mr-2"></b-icon>
              Logout
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-container>
    </b-navbar>
    <b-container class="content-wrapper py-4">
      <Nuxt />
    </b-container>
  </div>
</template>

<style lang="scss">
  .bg-body-front {
    background-color: #f5f1f1 !important;
  }

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

<style lang="sass">
  .preload
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    background-color: #17a2b8 !important
    z-index: 10000

  @mixin opacity($opacity)
    opacity: $opacity / 100
    filter: alpha(opacity=$opacity)

  .pulse
    position: relative
    left: 50%
    top: 50vh
    margin:
      left: -40px
      top: -40px
    &:before, &:after
      content: ''
      border: 5px solid #fff
      width: 80px
      height: 80px
      border-radius: 500px
      position: absolute
    &:before
      animation: pulse-outer .8s ease-in infinite
    &:after
      animation: pulse-inner .8s linear infinite

  @keyframes pulse-outer
    0%
      @include opacity(100)
    50%
      @include opacity(50)
    100%
      @include opacity(0)

  @keyframes pulse-inner
    0%
      transform: scale(0)
      @include opacity(0)
    100%
      transform: scale(1)
      @include opacity(100)
</style>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      loaded: false,
      time: '',
      date: '',
      weeks: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    };
  },
  computed: {
    ...mapGetters(['loggedInUser', 'isAuthenticated'])
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      location.reload();
    },
    zeroPadding(num, digit) {
      let zero = '';
      for (let i = 0; i < digit; i++) {
        zero += '0';
      }
      return (zero + num).slice(-digit);
    },
    updateTime() {
      const cd = new Date();
      this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
      this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding((cd.getMonth() + 1), 2) + '-' + this.zeroPadding(cd.getDate(), 2) + ' ' + this.weeks[cd.getDay()];
    }
  },
  created() {
    setInterval(this.updateTime, 1000);
  },
  mounted() {
    document.body.classList.add('bg-body-front');
    setTimeout(() => this.$set(this, 'loaded', true), 500);
  }
}
</script>
