<template>
  <b-card
    class="mb-3 mt-3 border-0 shadow-sm rounded"
  >
    <h2 class="suggest-header">
      Suggestion
    </h2>
    <ul class="list-unstyled">
      <b-media
        class="mb-3"
        tag="li"
        v-for="suggestion in suggestions"
        :key="suggestion.id"
      >
        <nuxt-link :to="'/story/' + suggestion.id">
          <template>
            <b-img
              :src="`http://mybedtimestories.epizy.com/assets/upload/thumbnails/${suggestion.thumbnail}`"
              class="suggestion-img"
              :alt="suggestion.thumbnail"
            >
            </b-img>
          </template>
          <h5 class="suggestion-title">{{ suggestion.title }}</h5>
          <span class="suggestion-category">
            {{ suggestion.name }}
          </span>
        </nuxt-link>
      </b-media>
    </ul>
  </b-card>
</template>

<style>
.detail-wrapper .suggest-header {
  font-size: 22px;
  font-weight: 600;
  color: #343a40;
  margin: 0 0 25px 0;
  padding: 5px 0 10px 0;
  border-bottom: 2px solid #ced4da;
}

.detail-wrapper .suggestion-img {
  position: relative;
  width: 90px;
  height: 60px;
  float: left;
  margin-right: 15px;
  display: block;
  background-color: #dfdfdf;
  border-radius: 6px;
}

.detail-wrapper .suggestion-title {
  position: relative;
  display: block;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.6;
  overflow: hidden;
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.detail-wrapper .suggestion-category {
  margin: 0;
  color: #ced4da;
}

.detail-wrapper .media .media-body {
  overflow: hidden;
}

.detail-wrapper .media .media-body a:hover,
.detail-wrapper .media .media-body a:focus {
  text-decoration: none;
}
</style>

<script>
export default {
  props: ['obj'],
  data() {
    return {
      suggestions: this.obj
    }
  }
}
</script>
