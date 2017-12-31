<template>
    <div v-show="show">
        <h1>Auth</h1>
        <form class="logInForm" @submit.prevent="logIn">
            <label for="email">Email:</label>
            <input type="email" placeholder="Enter Email:" required v-model="user.email">
            <br />
            <label for="password">Password:</label>
            <input type="password" placeholder="Enter password:" required v-model="user.password">
            <br />
            <hr>
            <br />
            <button type="submit">Login</button>
        </form>
        <div class="success" v-if="signSuccess">Login success!</div>
        <div class="success" v-if="signError">Oops! Get an error..</div>
    </div>
</template>

<script>
    import Firebase from 'firebase'

    export default {
        data() {
            return {
                show: true,
                signSuccess: false,
                signError: false,

                user: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            logIn() {
                Firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
                    .then( responce => {
                        console.log(responce);
                        const settings = {
                            email: responce.email,
                            uid: responce.uid,
                            main: true,
                            complete: true
                        }
                        this.$emit('addUser', settings);
                        this.show = false;
                        this.signSuccess = true;
                    })
                    .catch(error => {
                        this.signError = true;
                        console.log(error);
                    })
                    
            }
        }
    }
</script>

<style>

</style>