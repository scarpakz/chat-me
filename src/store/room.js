import { defineStore } from "pinia";
import { reactive } from "vue";

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

    return {
        room,
        reset
    }
})