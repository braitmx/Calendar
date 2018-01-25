<template>
    <div v-show="show">
        <h1>Auth</h1>
        <form class="logIn" @submit.prevent="logIn">
            <label class="logIn__email-l" for="email">Email:</label>
            <input class="logIn__email" type="email" placeholder="Enter Email:" required v-model="user.email">
            <br />
            <label class="logIn__pass-l" for="password">Password:</label>
            <input class="logIn__pass" type="password" placeholder="Enter password:" required v-model="user.password">
            <hr>
            <button class="logIn__submit" type="submit">Login</button>
        </form>
        <div class="success" v-if="signSuccess">Login success!</div>
        <div class="error" v-if="signError">Oops! Get an error..</div>
    </div>
</template>

<script>
    import Firebase from 'firebase';

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
                        const settings = {
                            email: responce.email,
                            uid: responce.uid,
                            main: true,
                            complete: true
                        };
                        this.$emit('addUser', settings);
                        this.show = false;
                        this.signSuccess = true;

                        // redirect to calendar     
                        this.$router.push('/calendar');
                    })
                    .catch(error => {
                        this.signError = true;
                        console.log(error);
                    }); 
            }
        }
    }
</script>

<style scoped>
.logIn {
    height: 160px;
}

.logIn__email, .logIn__pass {
    margin-bottom: 15px;
    height: 20px;
    border-radius: 5px;
}

.logIn__submit {
    margin-top: 15px;    
}
</style>