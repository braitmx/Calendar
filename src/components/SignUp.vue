<template>
    <div>
        <h1>Registration</h1>
        <form class="regForm" @submit.prevent="registerUser">
            <label for="email">Email:</label>
            <input type="email" placeholder="Enter Email:" required v-model="user.email">
            <br />
            <label for="password">Password:</label>
            <input type="password" placeholder="Enter password:" required v-model="user.password">
            <br />
            <label for="password2">Confirm password:</label>
            <input type="password" placeholder="Repeat password:" required v-model="user.confirmPassword">
            <br />
            <hr>
            <div class="alert" v-show="error">
                Passwords passwords not equal or incorrect!
            </div>
            <br />
            <button type="submit">Registration</button>
        </form>
    </div>
</template>

<script>
    import Firebase from 'firebase'
    
    export default {
        data() {
            return {
                user: {
                    email: '',
                    password: '',
                    confirmPassword: ''
                },
                error: false
            }
        },
        methods: {
            registerUser: function () {
                if (this.user.password !== this.user.confirmPassword || this.user.password.length < 6) {
                    this.error = true;
                } else {
                    Firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password)
                        .then(() => {
                            this.$emit('regSuccess', true);
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            }
        }
    }
</script>

<style scoped>

input {
    margin-bottom: 15px;
}

.alert {
    font-weight: bold;
    color: red;
}
</style>