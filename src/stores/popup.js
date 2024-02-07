import { ref } from 'vue'
import { defineStore } from 'pinia'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export const usePopup = defineStore('popup', () => {
    const popups = ref(new Set([]))
    const thanksMessage = ref('')

    function disableScroll(block) {
        const element = document.querySelector(`.${block}`)
        disableBodyScroll(element)
        this.popups.add(block)
    }

    function enableScroll(block) {
        const element = document.querySelector(`.${block}`)
        this.popups.delete(block)
        enableBodyScroll(element)
    }

    return { popups, thanksMessage, disableScroll, enableScroll }
})