<template>
  <fragment>
    <b-navbar
      type="dark"
      variant="dark"
      sticky
      class="shadow-sm"
      :class="isUserScrolling ? 'top-z-index' : ''"
    >
      <b-container fluid>
        <b-navbar-brand to="/" class="font-weight-bold px-2">
          Prop-Listing
        </b-navbar-brand>
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
              {{ loggedInUser.full_name }}
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
    <div class="d-flex content-wrapper">
      <b-sidebar
        title="Sidebar"
        :visible="true"
        :no-header="true"
        shadow="sm"
        width="240px"
      >
        <b-nav vertical pills>
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
        </b-nav>
      </b-sidebar>
      <b-container class="w-100 my-3 py-3">
        <b-card
          class="border-0 shadow-sm"
        >
          <Nuxt />
        </b-card>
      </b-container>
    </div>
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

    .b-sidebar-outer .b-sidebar .b-sidebar-body .nav-link {
      padding: 1.2rem 2rem !important;
      font-size: 16px !important;
      font-weight: 600 !important;
    }

    .b-sidebar-outer .b-sidebar .b-sidebar-body .nav-link.active {
      color: #fff !important;
    }

    .navbar-light .navbar-nav .nav-item.active,
    .navbar-light .navbar-nav .nav-item:hover,
    .navbar-light .navbar-nav .nav-item:focus {
      background: transparent !important;
    }

    .dropdown-toggle::after {
      display: none !important;
    }

    .content-wrapper .b-sidebar-outer {
      position: relative !important;
    }

    .content-wrapper .b-sidebar-outer .b-sidebar {
      position: relative !important;

    }

    .top-z-index {
      z-index: 9999 !important;
    }

    .font-weight-normal {
      font-weight: 600 !important;
    }

    .navbar-brand {
      font-size: 1.75rem;
      color: #777 !important;
    }

    .custom-img {
      height: 32px;
    }

    .navbar-light .navbar-nav .nav-link {
      padding: 0;
      font-size: 18px;
      color: #777 !important;
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
  middleware: 'auth',
  data() {
    return {
      isUserScrolling: false,
      navItems: [
        {
          link: '/',
          classes: 'font-weight-normal',
          text: 'Dashboard',
          slug: 'dashboard',
          icon: 'x-diamond',
        },
        {
          link: '/',
          classes: 'font-weight-normal',
          text: 'Property',
          slug: 'property',
          icon: 'house',
        },
        {
          link: '/',
          classes: 'font-weight-normal',
          text: 'Listing',
          slug: 'listing',
          icon: 'list-check',
        },
        {
          link: '/',
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
      const vm = this;
      this.clearActive();
      let index = _.findIndex(this.navItems, o => o.slug == vm.$nuxt.$route.name);
      if (index < 0) index = 1;
      this.navItems[index].classes += ' active';
    }
  },
  mounted() {
    this.handleActive();
  }
}
</script>
