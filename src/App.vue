<template>
    <div id="app">
        <div class="header">
            <div v-show="!signComplete">
                <router-link to="/sign-in">
                    <button type="button" v-on:click="reg = true">Login</button>
                </router-link>

                <router-link to="/sign-up">
                    <button type="button" v-on:click="reg = false">Registration</button>
                </router-link>
            </div>

            <div v-show="signComplete">
                <span>{{ email }}</span>
            </div>
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
.header {
  width: 100%;
  height: 50px;
  background-color: rgb(151, 151, 130);
  padding: 5px;
  box-sizing: border-box;
}

button {
  font-family: Verdana;
  border: 1px solid #C9AE34;
  color: #705D07;
  border-radius: 3px;
  padding: 5px;
  text-shadow: 0 1px 0 #FFFFFF;
  background-color: #FCE374;
}
</style>