<template>
  <div>
    <div class="login-container">
      <div class="login-form">
        <Transition>
          <h1 class="brand" v-show="process">CHAT-ME</h1>
        </Transition>
        
        <div class="form-group">
          <div class="label">Enter code name</div>
          <input type="text" name="" v-model="codename" id="" placeholder="Type here..">
          
          <Suspense>
            <button class="sign-in" @click="get">Enter</button>
            <template #fallback>
              Loading...
            </template>
          </Suspense>
        </div>
      </div>
      <div class="login-side">
        <h2>Feel bored? Chat with anyone.</h2>
        <h2>No registration required.</h2>
        <div class="side-content">
          <ul>
            <li><img src="./../../public/checkicon.png" alt=""> Different code names everyday</li>
            <li><img src="./../../public/checkicon.png" alt=""> Pick a tag for topics</li>
            <li><img src="./../../public/checkicon.png" alt=""> Exchange ideas</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.brand {
  font-family: 'Francois One';
  color: #D35252;
  font-size: 140px;
}
.login-side {
  background-color: #D35252;
}
.login-container {
  display: flex;
  height: 100vh;
}
.login-form, .login-side {
  flex: 1;
  text-align: center;
  padding-top: 40px;
}
.login-form {
  background-color: #fff;
}
.login-side h2{
  font-family: 'Francois One';
  color: #fff;
  font-size: 36px;
}
.form-group {
  font-family: 'Handlee', cursive;
  font-size: 46px;
  color: #D35252;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 50vh;
}
.form-group input::placeholder {
  color: #fff;
  font-family: 'Handlee', cursive;
}
.form-group input {
  background-color: #D35252;
  border: unset;
  font-size: 24px;
  color: #fff;
  text-align: center;
  padding: 15px 40px;
  width: 400px;
  font-family: 'Handlee', cursive;
}
.sign-in {
  background-color: #EAD515;
  color: black;
  border: unset;
  padding: 15px 30px;
  border-radius: 10px;
  margin-top: 20px;
  font-family: 'Francois One';
  font-size: 24px;
  cursor: pointer;
}
.side-content ul {
  list-style: none;
  text-align: left;
  color: #fff;
  font-family: 'Francois One';
  font-size: 36px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 70vh;
}
.side-content {
  padding-left: 40px;
}
.side-content li {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.side-content li img {
  margin-right: 10px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
<script>
import {onMounted, onUnmounted, ref} from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default {
  name: 'HomeView',
  components: {
  },
  setup () {
    // https://jsonplaceholder.typicode.com/posts
    let process = ref(true)
    let loading = ref(false)
    const router = useRouter()
    const codename = ref("")

    const get = async () => {
      if (codename.value == "") {
        alert("Do not leave it blank")
      } else {
        await axios.post('http://localhost:3000/login', { codename: codename.value })
        // await axios.post('http://localhost:3000/login', { codename: codename.value })
        .then(() => {
          // put in pinia
          router.push({name: 'topic'})
        })
        .catch((e) => alert(e))
      }
    }

    onMounted(() => {
      process.value = true
    })
    onUnmounted(() => {
      process.value = false
    })

    return {
      process,
      get,
      loading,
      codename
    }
  }
}
</script>
