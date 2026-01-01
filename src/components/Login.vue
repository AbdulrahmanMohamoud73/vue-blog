<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {api} from "../composables/posts.ts";

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

async function login() {
    try {
        const response = await api.post('auth/login', {
            username: username.value,
            password: password.value
        });

        const token = response.data.authToken;
        localStorage.setItem('authToken', token);
        await router.push('/');

    } catch (error: any) {
        errorMessage.value = error.response?.data || 'Login failed. Please check your credentials.';
    }
}
</script>

<template>
  <div class="container">
    <input v-model="username" type="text" placeholder="Username" class="input" />
    <input v-model="password" type="password" placeholder="Password" class="input" />
    <button class="login-button" @click="login">Login</button>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.login-button {
    margin: 10px;
    padding: 6.25px 12.5px;
    background-color: #000000;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 15px 0;
}

.input {
    display: block;
    width: 200px;
    margin: 10px auto;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>
