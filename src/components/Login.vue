<template>
    <div class="container">
        <h1>Login</h1>

        <form>
            <div class="form-group">
                <label for="username"><strong>Username</strong></label>
                <input v-model="username" type="text" class="form-control" id="username" placeholder="username" autofocus>
            </div>

            <div class="form-group">
                <label for="password"><strong>Password</strong></label>
                <input v-model="password" type="password" class="form-control" id="password" placeholder="password">
            </div>

            <button v-on:click="signIn()" class="btn btn-primary">Sign in</button>
        </form>
        <br>
        <p>Don't have an account? Sign up.</p>
    </div>
</template>

<script>
import axios from 'axios'
import jwt_decode from 'jwt-decode'
export default {
    name: 'Login',
    data: function() {
        return{
            username: '',
            password: ''
        }
    },
    mounted() {
        if(localStorage.getItem('jwt') !== null) {
            // Go to login page
            this.$router.push('/app')
        }
    },
    methods: {
        signIn: function() {
            axios.post('http://localhost:5000/user/login', {
                username: this.username, 
                password: this.password
            })
            .then(response => {
                // Store the JWT token and the user_id in localStorage.
                let jwtToken = response.data
                localStorage.setItem('jwt', jwtToken)
                let jwtTokenDecoded = jwt_decode(jwtToken);
                localStorage.setItem('user_id', jwtTokenDecoded.user_id);
                localStorage.setItem('username', jwtTokenDecoded.username);
                
                this.$router.push('/app')
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
}
</script>

<style scoped>

</style>
