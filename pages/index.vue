<template>
  <b-container class="d-flex mt-5 pt-5" style="justify-content:center;" fluid>
    <b-card class="form_auth">
      <formAuth
        title="Login"
        :form="form"
        :user="user"
        :msg="msg"
        button="Entrar"
        link_text="Primeira vez? Cadastre-se"
        link="/register"
        @onAuth="onLogin"
      />
      <!-- <nuxt-link to="/forgot" style="font-size:13px" class="ml-1">Esqueci minha senha</nuxt-link> -->
    </b-card>
  </b-container>
</template>

<script>
import { loginUser } from "../services/user";
import { saveToken } from "../services/authenticate";

import FormAuth from "../components/FormAuth";

export default {
  components: {
    FormAuth
  },
  data() {
    return {
      form: [
        {
          label: "Email",
          type: "email",
          placeholder: "Email",
          model: "email"
        },
        {
          label: "Senha",
          type: "password",
          placeholder: "Senha",
          model: "password"
        }
      ],
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
          .then(() =>
            this.$router.push({
              path: "/calendar"
            })
          );
      } catch (err) {
        return (this.msg = "Email ou senha inválidos");
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