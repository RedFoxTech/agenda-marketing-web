<template>
  <div id="app">
    <router-link to="/"></router-link>
    <router-link to="/register"></router-link>
    <router-link to="/calendar"></router-link>

    <router-view></router-view>
  </div>
</template>

<script>
import './layouts/global.css';

export default {};
</script>

<style>
</style>