<template>
  <nuxt-link :to="link + story.id" class="nuxt-link-active">
    <b-card
      :title="story.title"
      :sub-title="type ? type : story.category_id.name"
      :img-src="`http://mybedtimestories.epizy.com/assets/upload/thumbnails/${story.thumbnail}`"
      :img-alt="story.thumbnail"
      img-top
      tag="article"
      class="mb-2 border-0 shadow-sm rounded"
    >
      <b-card-text>
        {{ story.description }}
      </b-card-text>
    </b-card>
  </nuxt-link>
</template>

<style>
a.nuxt-link-active:hover,
a.nuxt-link-active:focus {
  text-decoration: none;
}

a.nuxt-link-active:hover .card,
a.nuxt-link-active:focus .card {
  transform: translateY(-4px);
}

a.nuxt-link-active:hover .card .card-body .card-title,
a.nuxt-link-active:focus .card .card-body .card-title {
  color: #7D61C8;
}

a.nuxt-link-active .card {
  transition: all ease-in-out 0.2s;
}

a.nuxt-link-active .card .card-img-top {
  height: 120px;
  object-fit: cover;
  object-position: center;
  transition: all ease-in-out 0.2s;
}

a.nuxt-link-active .card .card-body {
  padding: 15px;
}

a.nuxt-link-active .card .card-body .card-title {
  color: #212529;
  font-size: 14px;
  font-weight: bold;
  margin: 0;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 8px;
}

a.nuxt-link-active .card .card-body .card-subtitle {
  font-size: 11px;
  font-weight: 600;
  color: #868e96;
}

a.nuxt-link-active .card .card-body .card-text {
  font-size: 12px;
  color: #868e96;
  margin: 8px 0;
  overflow: hidden;
  height: 51px;
  text-overflow: ellipsis;
}
</style>

<script>
export default {
  props: ['storyobj', 'linkpath', 'typetext'],
  data() {
    return {
      story: this.storyobj,
      link: this.linkpath,
      type: this.typetext
    };
  }
}
</script>
