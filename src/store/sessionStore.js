import { defineStore } from "pinia";
import { reactive } from "vue";

export const useSessionStore = defineStore('user_session', () => {
    const user = reactive({
        id: "",
        codename: ""
    })

    const setUserData = ({id, code_name}) => {
        user.id = id
        user.codename = code_name
    }

    function resetCodeName() {
        const reset = {
            id: "",
            codename: ""
        }
        Object.assign(user, reset)
    }

    return {
        resetCodeName,
        setUserData,
        user
    }
})