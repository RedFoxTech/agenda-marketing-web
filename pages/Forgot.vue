<template>
  <b-container class="d-flex mt-5 pt-5" style="justify-content:center;" fluid>
    <b-card class="form_auth">
      <formAuth
        title="Redefinir senha"
        :form="form"
        :user="user"
        :msg="msg"
        button="Enviar"
        :link_text="link_text"
        :link="link"
        @onAuth="onForgot"
      />
    </b-card>
  </b-container>
</template>

<script>
import { forgotUser } from "../services/user";

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
        }
      ],
      user: {
        email: ""
      },
      msg: "",
      link: "/",
      link_text: "Voltar pata o login"
    };
  },
  methods: {
    async onForgot() {
      try {
        await forgotUser(this.user)
          .then(
            ({ data }) =>
              (this.msg = "O token de validação foi enviado para o seu email")
          )
          .then((this.link_text = "Validar token"))
          .then((this.link = "/reset"));
      } catch (err) {
        console.log(err);
        this.msg = "Usuário não encontrado";
      }
    }
  }
};
</script>

<style>
</style>