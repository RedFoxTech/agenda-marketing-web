<template>
  <b-container class="d-flex mt-5 pt-5" style="justify-content:center;" fluid>
    <b-card class="form_auth">
      <formAuth
        title="Redefinir Senha"
        :form="form"
        :user="user"
        :msg="msg"
        button="Redefinir"
        link_text="Voltar para o login"
        link="/"
        @onAuth="onReset"
      />
    </b-card>
  </b-container>
</template>

<script>
import { resetUser } from "../services/user";

import FormAuth from "../components/FormAuth";

export default {
  components: {
    FormAuth
  },
  data() {
    return {
      form: [
        {
          label: "Token",
          type: "text",
          placeholder: "Token",
          model: "token"
        },
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
        token: "",
        email: "",
        password: ""
      },
      msg: ""
    };
  },
  methods: {
    async onReset() {
      try {
        await resetUser(this.user).then(() =>
          this.$router.push({
            path: "/"
          })
        );
      } catch (err) {
        this.msg = "Token inválido";
      }
    }
  }
};
</script>

<style>
</style>