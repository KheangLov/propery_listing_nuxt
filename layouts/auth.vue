<template>
  <b-container class="h-100 d-flex justify-content-center">
    <a href="/" class="btn btn-link position-absolute p-3 text-secondary" style="left: 0;">
      <b-icon
        icon="arrow-left"
      ></b-icon>
    </a>
    <b-card
      class="my-auto border-0 shadow-sm rounded auth-form"
    >
      <Nuxt />
    </b-card>
  </b-container>
</template>

<style lang="scss">
  html, body {
    height: 100%;

    #__nuxt {
      height: 100%;

      #__layout {
        height: 100%;

        .auth-form {
          width: 360px;
        }
      }
    }
  }
</style>
