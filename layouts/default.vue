<template>
  <fragment>
    <b-navbar
      v-if="loggedInUser"
      type="light"
      variant="light"
      sticky
      class="shadow-sm border-0 m-0"
      :class="isUserScrolling ? 'top-z-index' : ''"
    >
      <b-container fluid>
        <b-navbar-brand class="font-weight-bold px-2 text-white text-uppercase">
          P-Listing
        </b-navbar-brand>
        <b-navbar-nav>
          <b-nav-item
            v-for="({ link, classes, text, icon }, i) in navItems"
            @click="handleActive"
            :href="link"
            link-classes="rounded-0 text-secondary"
            :class="classes"
            :key="i"
          >
            <b-icon :icon="icon" class="mr-2"></b-icon>
            {{ text }}
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown
            right
            class="p-0"
            menu-class="border-0 shadow-sm p-0"
          >
            <template
              #button-content
            >
              <b-avatar
                :src="loggedInUser.profile && loggedInUser.profile"
                :text="!loggedInUser.profile && `${loggedInUser.first_name[0]}${loggedInUser.last_name[0]}`"
              ></b-avatar>
            </template>
            <b-dropdown-item disabled>
              {{ loggedInUser.first_name }}
              {{ loggedInUser.last_name }}
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item
              href="/profile"
            >
              Profile
            </b-dropdown-item>
            <b-dropdown-item
              v-if="isAuthenticated"
              href="javascript:void(0)"
              @click="logout"
            >
              Logout
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-container>
    </b-navbar>
    <b-container fluid class="content-wrapper p-0">
      <b-container class="my-4">
        <b-card
          class="border-0 shadow-sm"
        >
          <Nuxt />
        </b-card>
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

    .navbar-brand {
      font-size: 1.25rem;
      color: #545b62 !important;
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
import _ from 'lodash';
import { mapGetters } from 'vuex';

export default {
  middleware: 'authenticated',
  data() {
    return {
      isUserScrolling: false,
      navItems: [
        {
          link: '/',
          classes: 'font-weight-normal',
          text: 'Dashboard',
          slug: 'index',
          icon: 'x-diamond',
        },
        {
          link: '/property',
          classes: 'font-weight-normal',
          text: 'Property',
          slug: 'property',
          icon: 'house',
        },
        {
          link: '/listing',
          classes: 'font-weight-normal',
          text: 'Listing',
          slug: 'listing',
          icon: 'list-check',
        },
        {
          link: '/user',
          classes: 'font-weight-normal',
          text: 'User',
          slug: 'user',
          icon: 'person',
        },
      ]
    };
  },
  computed: {
    ...mapGetters(['loggedInUser', 'isAuthenticated'])
  },
  created() {
    if (process.client) {
      window.addEventListener('scroll', this.handleScroll);
    }
  },
  watch: {
    $route() {
      this.handleActive();
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout();
    },
    handleScroll() {
      this.isUserScrolling = (window.scrollY > 0);
    },
    clearActive() {
      this.navItems.forEach(val => val.classes = 'font-weight-normal');
    },
    handleActive() {
      this.clearActive();
      let index = _.findIndex(this.navItems, o => o.slug == this.$nuxt.$route.name.split('-')[0]);
      if (index >= 0) this.navItems[index].classes += ' active';
    }
  },
  mounted() {
    this.handleActive();
  }
}
</script>
