<template>
  <b-container>
    <StorySection :storiesobj="latestData" :titletext="'Latest Posts'" />
    <StorySection :storiesobj="allData" :titletext="'All Posts'" />
    <StorySection
      v-for="data in cateData"
      :storiesobj="data.stories"
      :titletext="data.name"
      :typetext="data.name"
      :key="data.id"
    />
  </b-container>
</template>

<script>
import axios from 'axios';
export default {
  async asyncData(context) {
    const latestData = await axios.get('http://localhost:1337/api/v1/stories?per_page=6&date=true')
      .then(val => val.data.data.data);
    const allData = await axios.get('http://localhost:1337/api/v1/stories?per_page=6')
      .then(val => val.data.data.data);
    const cateData = await axios.get('http://localhost:1337/api/v1/categories')
      .then(val => val.data.data);
    return { latestData, allData, cateData };
  },
  methods: {
    loginZ1() {
      axios.post('https://dev.z1mobile.com/api/v2/signin-or-signup', {
        phone: '+85570218860',
        password: '1234'
      })
        .then(res => console.log(res));
    },
    fetchListing() {
      axios.get('https://dev.z1mobile.com/api/v2/listings')
        .then(res => console.log(res));
    },
  },
  mounted() {
    loginZ1();
    fetchListing();
  }
  // data() {
  //   return {
  //     latestData: [],
  //     allData: []
  //   };
  // },
  // async mounted() {
  //   const vm = this;
  //   await axios.get('http://localhost:1337/api/v1/stories?per_page=6&date=true')
  //     .then(val => {
  //       vm.latestData = val.data.data.data;
  //     });

  //   await axios.get('http://localhost:1337/api/v1/stories?per_page=6')
  //     .then(val => {
  //       console.log(val);
  //       vm.allData = val.data.data.data;
  //       console.log(vm.allData);
  //     });
  // }
  // async fetch() {
  //   this.latestData = await axios.get('http://localhost:1337/api/v1/stories?per_page=6&date=true')
  //     .then(val => val.data.data.data);
  //   this.allData = await axios.get('http://localhost:1337/api/v1/stories?per_page=6')
  //     .then(val => val.data.data.data);
  // }
}
</script>
