<template>
    <div>
        <div class="topic-container"
        data-aos="fade-in"
        data-aos-duration="1500"
        data-aos-delay="500"
        data-aos-once="false"
        data-aos-anchor-placement="top-center"
        >
            <Transition>
                <div class="user-welcome">Hey, user!</div>
            </Transition>
                <h2>Choose a topic..</h2>
            <div class="form-group">
                <input type="text" class="search-topic-input" placeholder="Type here" v-model="room_name">
            </div>
            <router-link :to="{ name: 'room' }" class="sign-in"
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay="1500"
            @click="goToRoom()"
            >Join room </router-link>
            <!-- <div>
                DIV SUGGESTIONS HERE
            </div> -->
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/store/sessionStore';

export default {
    name: "TopicView",
    setup () {
        const uss = useSessionStore()
        const router = useRouter()
        const room_name = ref("")

        const goToRoom = async () => {
            await axios.get('http://localhost:3000/api/v1/room')
            .then(async () => {
                await axios.post('http://localhost:3000/api/v1/create/room', {room_name: room_name.value})
                .then(() => {
                    addActiveRoom()
                })
                .catch((e) => console.log(e))
            })
        }

        const addActiveRoom = async () => {
            await axios.get('http://localhost:3000/api/v1/room')
            .then(async (response) => {
                const rooms = response.data
                const getCurrentRoom = rooms.filter((item) => { // check if same value from the input
                    return item.name == room_name.value
                })
                await axios.post('http://localhost:3000/api/v1/create/active_room', { user_id: uss.user.id, room_id: getCurrentRoom[0].id })
                .then(() => {
                    router.push({name: 'room'})
                })
                .catch((e) => console.log(e))
            })

        }

        return {
            room_name,
            goToRoom
        }
    }
}
</script>

<style>
.topic-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 90vh;
}
.user-welcome {
    color: #fff;
    font-size: 36px;
    font-family: 'Francois One';
}
.topic-container h2 {
    font-size: 64px;
    color: #fff;
    font-family: 'Francois One';
}
.topic-container .form-group {
    height: unset !important;
}
.search-topic-input {
    background-color: #fff !important;
    color: #000 !important;
}
.search-topic-input::placeholder {
    color: #000 !important;
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