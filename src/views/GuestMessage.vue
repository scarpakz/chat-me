<template>
    <div class="user-chat-info">
        <div class="chat-head-and-content pt-sm pl-sm" :class="userinfo.type == 'user' ? 'reverse-user' : ''">
            <div class="chat-image pr-sm">
                <div class="img mb-sm"></div>
                <div class="chat-name">
                    {{ userinfo.name }}
                </div>
            </div>
            <div class="chat-content pl-sm">
                <div class="chat-time">
                   <b>Sent:</b> {{ userinfo.date }}
                </div>
                <div class="chat-message">
                    {{ userinfo.message }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['userinfo'],
    setup() {

    }
}
</script>

<style>
.reverse-user {
    flex-direction: row-reverse;
}
.reverse-user .chat-message {
    background-color: #e7e7e7;
    margin-right: 10px;
}
</style>