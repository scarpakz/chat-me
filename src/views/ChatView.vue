<template>
    <div class="ml-lg mr-lg">
        <div class="chat-nav mt-lg">
            <div class="user-greeting ml-lg">
                <h1>Hey, user!</h1>
            </div>
            <div class="sign-out mr-lg">
                <a @click="signOut()">Sign out</a>
            </div>
        </div>
        <div class="chat-container mt-lg ml-lg mr-lg"
        data-aos="fade-in"
        data-aos-duration="1500"
        data-aos-delay="500"
        data-aos-once="false"
        data-aos-anchor-placement="top-center"
        >
            <div class="chat-options">
                <div class="font-lg">
                    Topic: Anime
                </div>
                <div>
                    <button class="sign-in" @click="chooseAnotherTopic">Choose Another Topic</button>
                </div>
                <div class="font-lg">
                    <span>49 Online</span>
                </div>
            </div>
            <div class="chat-discussion mt-md">
                <div class="discussion-placeholder bg-white"
                >
                    <template v-for="item in messages" :key="item.id">
                        <GuestMessage :userinfo="item"/>
                    </template>
                </div>
            </div>
            <div class="chat-own">
                <textarea name="" id="" cols="30" rows="3" placeholder="Type here.."></textarea><br>
                <button class="send-btn">Send</button>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import GuestMessage from './GuestMessage.vue';
import axios from 'axios'
import { useRouter } from 'vue-router'
import {useSessionStore} from './../store/sessionStore'
import { useRoom } from '@/store/room';

export default {
    components: { GuestMessage },
    setup() {
        const ur = useRoom()
        const uss = useSessionStore()
        const router = useRouter()
        const messages = ref([
            {
                name: "codexyz",
                message: "Lorem ipsum dolor sit amet.",
                date: `${new Date().toLocaleString('default', { month: 'short' })} ${new Date().getDate()}, ${new Date().getHours()}:${new Date().getMinutes()} ${new Date().getHours() < 12 ? 'AM' : 'PM'}`,
                type: "guest",
            },
            {
                name: "abc",
                message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, soluta.",
                date: `${new Date().toLocaleString('default', { month: 'short' })} ${new Date().getDate()}, ${new Date().getHours()}:${new Date().getMinutes()} ${new Date().getHours() < 12 ? 'AM' : 'PM'}`,
                type: "user"
            },
            {
                name: "def",
                message: "Lorem ipsum dolor sit, amet consectetur adipisicing.",
                date: `${new Date().toLocaleString('default', { month: 'short' })} ${new Date().getDate()}, ${new Date().getHours()}:${new Date().getMinutes()} ${new Date().getHours() < 12 ? 'AM' : 'PM'}`,
                type: "guest"
            },
            {
                name: "test",
                message: "Lorem ipsum dolor sit, amet consectetur adipisicing.",
                date: `${new Date().toLocaleString('default', { month: 'short' })} ${new Date().getDate()}, ${new Date().getHours()}:${new Date().getMinutes()} ${new Date().getHours() < 12 ? 'AM' : 'PM'}`,
                type: "user"
            },
            {
                name: "abc",
                message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, soluta.",
                date: `${new Date().toLocaleString('default', { month: 'short' })} ${new Date().getDate()}, ${new Date().getHours()}:${new Date().getMinutes()} ${new Date().getHours() < 12 ? 'AM' : 'PM'}`,
                type: "user"
            },
            {
                name: "def",
                message: "Lorem ipsum dolor sit, amet consectetur adipisicing.",
                date: `${new Date().toLocaleString('default', { month: 'short' })} ${new Date().getDate()}, ${new Date().getHours()}:${new Date().getMinutes()} ${new Date().getHours() < 12 ? 'AM' : 'PM'}`,
                type: "guest"
            },
            {
                name: "test",
                message: "Lorem ipsum dolor sit, amet consectetur adipisicing.",
                date: `${new Date().toLocaleString('default', { month: 'short' })} ${new Date().getDate()}, ${new Date().getHours()}:${new Date().getMinutes()} ${new Date().getHours() < 12 ? 'AM' : 'PM'}`,
                type: "user"
            }
        ])
        
        const signOut = async () => {
            await axios.delete(`http://localhost:3000/logout/${uss.codename}`)
            .then(async () => {
                const { id } = uss.user
                await axios.delete(`http://localhost:3000/api/v1/delete/active_room/${id}`)
                .then(() => { 
                    uss.resetCodeName()
                    ur.reset()
                    router.push({name: 'home'})
                 })
                .catch(e => console.log(e))
            })
            .catch((e) => alert(e))
        }

        const chooseAnotherTopic = async () => {
            const { id } = uss.user
            await axios.delete(`http://localhost:3000/api/v1/delete/active_room/${id}`)
            .then(() => { 
                ur.reset()
                router.push({ name: 'topic' })
            })
            .catch(e => console.log(e))
        }

        return {
            messages,
            signOut,
            chooseAnotherTopic
        }
    }
}
</script>
<style>
.chat-own {
    position: relative;
}
.chat-own textarea {
    width: 50%;
    font-family: 'Francois One';
    font-size: 18px;
}
.chat-content {
    max-width: 500px;
}
.chat-image {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.chat-image .img {
    height: 50px;
    width: 50px;
    background-color: #8f8f8f;
    border-radius: 60px;
}
.chat-time { 
    padding-left: 30px;
    font-size: 14px;
    color:#4c4c4c;
}
.chat-head-and-content {
    display: flex;
}
.discussion-placeholder {
    height: 600px;
    overflow-y: auto;
}
.pl-sm { padding-left: 10px; }
.pr-sm { padding-right: 10px; }
.pt-sm { padding-top: 10px; }
.pb-sm { padding-bottom: 10px; }
.bg-white {
    background-color: #fff;
}
.mb-sm { margin-bottom: 10px; }
.mt-md {
    margin-top: 20px;
}
.mt-lg {
    margin-top: 40px;
}
.ml-lg {
    margin-left: 80px;
}
.mr-lg {
    margin-right: 80px;
}
.chat-nav {
    display: flex;
    width: 100%;
    color: #fff;
    font-family: 'Francois One';
}
.chat-nav div {
    flex: 1;
}
.sign-out {
    display: flex;
    justify-content: flex-end;
}
.sign-out a {
    font-size: 36px;
}
.font-lg {
    font-size: 36px;
    color: #fff;
    font-family: 'Francois One';
}
.chat-options {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.chat-message {
  background-color: #EAD515;
  color: black;
  border: unset;
  padding: 10px 30px;
  border-radius: 20px;
  margin-top: 3px;
  font-family: 'Francois One';
  font-size: 16px;
  cursor: pointer;
}
.send-btn {
  background-color: #EAD515;
  color: black;
  border: unset;
  padding: 10px 30px;
  border-radius: 20px;
  margin-top: 3px;
  font-family: 'Francois One';
  font-size: 16px;
  cursor: pointer;
}
.chat-container {
    margin-bottom: 100px;
}
</style>