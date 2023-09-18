import { defineStore } from "pinia";
import { computed, reactive } from "vue";

export const useRoom = defineStore('store_room', () => {
    const room = reactive({
        id: "",
        name: ""
    })

    const reset = () => {
        const form = {
            id: "",
            name: ""
        }
        Object.assign(room, form)
    }

    const getRoomName = computed(() => {
        return room.name
    })

    const getRoomId = computed(() => {
        return room.id
    })

    return {
        room,
        reset,
        getRoomName,
        getRoomId
    }
})