<template>
    <div>
        <h1>Registration</h1>
        <form class="reg" @submit.prevent="registerUser">
            <label class="reg__email-l" for="email">Email:</label>
            <input class="reg__email" type="email" placeholder="Enter Email:" required v-model="user.email">
            <br />
            <label class="reg__pass-l" for="password">Password:</label>
            <input class="reg__pass" type="password" placeholder="Enter password:" required v-model="user.password">
            <br />
            <label class="reg__pass2-l" for="password2">Confirm password:</label>
            <input class="reg__pass2" type="password" placeholder="Repeat password:" required v-model="user.confirmPassword">
            <hr>
            <div class="reg__alert" v-show="error">
                Passwords not equal or incorrect!
            </div>

            <button class="reg__submit" type="submit">Registration</button>
        </form>
    </div>
</template>

<script>
    import Firebase from 'firebase';
    
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
.reg {
    height: 200px;
}

.reg__email, .reg__pass, .reg__pass2 {
    margin-bottom: 15px;
    height: 20px;
    border-radius: 5px;
} 

.reg__alert {
    font-weight: bold;
    color: red;
}

.reg__submit {
    margin-top: 15px;
}
</style>