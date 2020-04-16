<template>
  <b-container class="d-flex mt-5 pt-5" style="justify-content:center;" fluid>
    <b-card class="form_auth">
      <b-form @submit="onRegister">
        <h4 class="d-flex" style="justify-content:space-between">
          Cadastro
          <img src="../assets/redfox_logo.png" width="120" />
        </h4>
        <b-form-group>
          <label for="input-1">Nome</label>
          <b-form-input placeholder="Nome" v-model="user.name" required />
        </b-form-group>
        <b-form-group>
          <label for="input-1">Email</label>
          <b-form-input type="email" placeholder="email" v-model="user.email" required />
        </b-form-group>
        <b-form-group>
          <label for="input-2">Senha</label>
          <b-form-input type="password" placeholder="senha" v-model="user.password" required />
        </b-form-group>
        <p class="msg_alert">{{msg}}</p>
        <b-row class="m-1" style="justify-content:space-between; align-items:center">
          <h6 style="color:#007bff">
            <nuxt-link to="/">Voltar para o login</nuxt-link>
          </h6>
          <b-button variant="primary" type="submit">Cadastrar</b-button>
        </b-row>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
import { registerUser } from "../services/user";
import { saveToken } from "../services/authenticate";

export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: ""
      },
      msg: ""
    };
  },
  methods: {
    async onRegister() {
      try {
        await registerUser(this.user)
          .then(({ data }) => this.authenticateUser(data))
          .then(() => this.$router.push({
              path: "/calendar"
            }));
      } catch (err) {
        this.msg = "Email já existe";
      }
    },
    authenticateUser(data) {
      saveToken(data.token);
    }
  }
};
</script>

<style>
</style>