<template>
  <div class="detail-wrapper">
    <b-container>
      <b-row>
        <b-col md="9">
          <b-card
            class="mb-3 mt-3 border-0 shadow-sm rounded"
          >
            <h2 class="story-title mb-2">
              {{ story.title }}
            </h2>
            <span>
              Published at: {{ createdDate }}
            </span>
            <p class="story-text mt-4">
              {{ story.content }}
            </p>
            <b-img
              v-for="(img, index) in story.images"
              :src="`http://mybedtimestories.epizy.com/assets/upload/images/${img.name}`"
              fluid-grow
              class="mb-3"
              :alt="img.name"
              :key="index"
            >
            </b-img>
          </b-card>
        </b-col>
        <b-col md="3" class="pl-md-0">
          <Sidebar :obj="suggestions" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style>
.detail-wrapper .story-title {
  font-size: 38px;
  font-weight: bold;
  color: #495057;
}

.detail-wrapper .story-text {
  font-size: 20px;
  color: #495057;
  opacity: 0.8;
  margin-bottom: 25px;
}
</style>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
  async asyncData({ route: { params: { id } } }) {
    const story = await axios.get(`http://localhost:1337/api/v1/story/${id}`)
      .then(val => val.data.data[0]);
    const suggestions = await axios.get(`http://localhost:1337/api/v1/story/${id}/suggestion`)
      .then(val => val.data.data);
    return { story, suggestions };
  },
  computed: {
    createdDate: function() {
      return moment(this.story.created_date).format('MMMM Do YYYY, h:mm:ssA');
    }
  }
}
</script>
