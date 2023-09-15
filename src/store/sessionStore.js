import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useSessionStore = defineStore('user_session', () => {
    const codename = ref("")

    const getComputedCodeName = computed(() => {
        return codename.value
    })

    function resetCodeName() {
        codename.value = ""
    }

    return {
        codename,
        getComputedCodeName,
        resetCodeName
    }
})