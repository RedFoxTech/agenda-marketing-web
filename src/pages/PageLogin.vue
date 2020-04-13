<template>
  <b-container class="d-flex mt-5 pt-5" style="justify-content:center;" fluid>
    <b-card class="form_auth">
      <b-form @submit="onLogin">
        <h4 class="d-flex" style="justify-content:space-between">
          Login
          <img src="../assets/redfox_logo.png" width="120" />
        </h4>
        <b-form-group>
          <label for="input-1">Email</label>
          <b-form-input type="email" placeholder="email" v-model="user.email" required />
        </b-form-group>
        <b-form-group>
          <label for="input-2">Senha</label>
          <b-form-input type="password" placeholder="senha" v-model="user.password" required />
        </b-form-group>
        <p class="msg_alert">{{msg}}</p>
        <b-row class="m-1 d-flex footer_form">
          <h6 style="color:#007bff">
            <router-link to="/register">Primeira vez? Cadastre-se</router-link>
          </h6>
          <b-button variant="primary" type="submit">Entrar</b-button>
        </b-row>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
import { loginUser } from "../services/user";
import { saveToken } from "../services/authenticate";

export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      msg: ""
    };
  },
  methods: {
    async onLogin() {
      try {
        return await loginUser(this.user)
          .then(({ data }) => this.authenticateUser(data))
          .then(() => this.$router.push("/calendar"));
      } catch (err) {
        return (this.msg = "Email ou senha inválido");
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