<template>
  <b-container class="d-flex mt-5 pt-5" style="justify-content:center;" fluid>
    <b-card class="form_auth">
      <formAuth
        title="Cadastro"
        :form="form"
        :user="user"
        :msg="msg"
        button="Cadastrar"
        link_text="Voltar para o login"
        link="/"
        @onAuth="onRegister"
      />
    </b-card>
  </b-container>
</template>

<script>
import { registerUser } from "../services/user";
import { saveToken } from "../services/authenticate";

import FormAuth from "../components/FormAuth";

export default {
  components:{
    FormAuth
  },
  data() {
    return {
      form: [
        {
          label: "Nome",
          type: "text",
          placeholder: "Nome",
          model: "name"
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
          .then(() =>
            this.$router.push({
              path: "/calendar"
            })
          );
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