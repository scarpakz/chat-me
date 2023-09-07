<template>
    <div>
        <div class="topic-container">
            <Transition>
                <div class="user-welcome">Hey, user!</div>
            </Transition>
                <h2>Choose a topic..</h2>
            <div class="form-group">
                <input type="text" class="search-topic-input" placeholder="Type here">
            </div>
            <router-link :to="{ name: 'room' }" class="sign-in">Join room </router-link>
            <!-- <div>
                DIV SUGGESTIONS HERE
            </div> -->
        </div>
    </div>
</template>

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

<script>
export default {
    name: "TopicView",
    setup () {

        return {

        }
    }
}
</script>