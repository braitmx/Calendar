<template>
  <div id="app">
    <div v-show="!signComplete">
      <router-link to="/sign-in">
        <button type="button" v-on:click="reg = true">Login</button>
      </router-link>

      <router-link to="/sign-up">
        <button type="button" v-on:click="reg = false">Registration</button>
      </router-link>
    </div>

    <div v-show="signComplete">
      <router-link to="/calendar">
        <button type="button">Calendar</button>
      </router-link>

      <span>{{ email }}</span>
    </div>

    <div class="container">
      <router-view @addUser="signComplete = $event.complete, email = $event.email, uid= $event.uid" v-bind:uid="uid"></router-view>
    </div>
  </div>
</template>

<script>

  import SigiUp from './components/SignUp.vue'
  import SigiIn from './components/SignIn.vue'
  import MainPage from './components/MainPage.vue'
  import AddTask from './components/AddTask.vue'

  export default {
    data() {
      return {
        reg: false,
        signComplete: false,
        email: '',
        uid: ''
      }
    },
    components: {
      SigiIn,
      SigiUp,
      MainPage,
      AddTask
    }
  }
</script>

<style>

</style>