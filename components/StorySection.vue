<template>
  <div v-if="stories.length > 0" class="stories-wrapper mt-3">
    <h5 class="border-bottom pb-2 mb-3">
      <span class="border-bottom border-primary font-weight-bold pb-2">{{ title }}</span>
    </h5>
    <b-row class="pl-2 pr-2">
      <b-col
        sm="6"
        md="4"
        lg="2"
        v-for="story in stories"
        class="p-1"
        :key="story.id"
      >
        <Card :storyobj="story" :linkpath="'/story/'" :typetext="type" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: ['storiesobj', 'titletext', 'typetext'],
  data() {
    return {
      stories: this.storiesobj,
      title: this.titletext,
      type: this.typetext
    }
  }
}
</script>
