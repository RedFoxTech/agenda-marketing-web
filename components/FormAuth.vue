<template>
  <b-form @submit="submit">
    <h4 class="d-flex" style="justify-content:space-between">
      {{title}}
      <img src="../assets/redfox_logo.png" width="120" />
    </h4>
    <b-form-group v-for="(input, index) in form" :key="index">
      <label for>{{input.label}}</label>
      <b-form-input
        :type="input.type"
        :placeholder="input.placeholder"
        v-model="user[input.model]"
        required
      ></b-form-input>
    </b-form-group>
    <p class="msg_alert">{{msg}}</p>
    <b-row class="m-1 d-flex footer_form">
      <h6 style="color:#007bff">
        <nuxt-link :to="link">{{link_text}}</nuxt-link>
      </h6>
      <b-button variant="primary" type="submit">{{button}}</b-button>
    </b-row>
  </b-form>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    user: {
      type: Object,
      required: true
    },
    msg: {
      type: String,
      required: false
    },
    form: {
      type: Array,
      required: true
    },
    button: {
      type: String,
      required: true
    },
    link_text: {
      type: String,
      required: false
    },
    link: {
      type: String
    }
  },
  methods: {
    submit(e) {
      e.preventDefault();

      this.$emit("onAuth", true);
    }
  }
};
</script>

<style>
</style>