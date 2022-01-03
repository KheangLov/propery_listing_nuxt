<template>
  <fragment>
    <div
      v-if="create"
      class="d-flex justify-content-between"
    >
      <b-link :href="create.link" class="btn btn-secondary mb-3">
        <b-icon icon="person-plus" aria-hidden="true" class="mr-2"></b-icon>
        <span style="font-size: 18px;">
          {{ create.text }}
        </span>
      </b-link>

      <b-form-group
        label-for="filter-input"
        class="mb-0"
      >
        <b-input-group>
          <b-form-input
            id="filter-input"
            v-model="filter"
            type="search"
            placeholder="Type to Search"
            style="min-height: 41px;"
          ></b-form-input>
        </b-input-group>
      </b-form-group>
    </div>
    <b-form-group
      v-else
      label-for="filter-input"
    >
      <b-input-group>
        <b-form-input
          id="filter-input"
          v-model="filter"
          type="search"
          placeholder="Type to Search"
        ></b-form-input>
      </b-input-group>
    </b-form-group>

    <b-table
      class="text-truncate overflow-auto"
      :items="items"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      :filter="filter"
      responsive
    >
      <slot></slot>
    </b-table>
  </fragment>
</template>

<script>
import { Fragment } from 'vue-fragment';
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  components: {
    Fragment,
    ValidationObserver,
    ValidationProvider
  },
  props: ['items', 'fields', 'create'],
  data() {
    return {
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
    };
  },
}
</script>
