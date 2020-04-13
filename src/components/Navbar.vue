<template>
  <div>
    <b-navbar class="navbar" toggleable="lg">
      <b-navbar-brand style="color:#fff">Calendário</b-navbar-brand>
      <!-- <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-button
            class="mr-2"
            variant="danger"
            @click="$emit('openModalSchedule')"
            pill
          >Nova agenda</b-button>
          <b-button
            variant="danger"
            @click="openModalCategory = !openModalCategory"
            pill
          >Nova categoria</b-button>
        </b-navbar-nav>
      </b-collapse>-->
    </b-navbar>
  </div>
</template>

<script>
export default {};
</script>

<style>
.btn_colors button {
  border: inherit;
  height: 20px;
  width: 20px;
  border-radius: 100%;
}
.navbar {
  box-shadow: 8px -1px 20px #2d4967;
  background-color: #2d4967 !important
}
</style>
