<script setup>
import { ref } from 'vue'
import ThePopup from '@/components/layouts/ThePopup.vue'
import { usePopup } from '@/stores/popup'

const popupStore = usePopup()
const props = defineProps({
    user: {
        type: Object,
        required: true,
        default: {}
    }
})

const emit = defineEmits(['updateUser'])

const namePopup = ref('userEdit')

let saveBtnIsDisabled = ref(true)

const updateUser = () => {
    emit('updateUser')
    saveBtnIsDisabled.value = true
    popupStore.enableScroll(namePopup.value)
}
</script>

<template>
    <the-popup
        :name="namePopup"
    >
        <div class="content">
            <div class="list">
                <label>
                    <span>
                        Фамилия
                    </span>
                    <input
                        v-model="props.user.last_name"
                        @input="saveBtnIsDisabled = false"
                    />
                </label>
                <label>
                    <span>
                        Имя
                    </span>
                    <input
                        v-model="props.user.first_name"
                        @input="saveBtnIsDisabled = false"
                    />
                </label>
                <label>
                    <span>
                        Почта
                    </span>
                    <input
                        v-model="props.user.email"
                        @input="saveBtnIsDisabled = false"
                    />
                </label>
            </div>
            <button class="btn btn_blue save"
                :disabled="saveBtnIsDisabled"
                @click="updateUser()"
            >
                Сохранить
            </button>
        </div>
    </the-popup>
</template>

<style lang="scss" scoped>
.list {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    & label {
        flex: 0 0 100%;
        &:not(:last-child) {
            margin-bottom: 10px;
        }
        & span {
            display: block;
            margin-bottom: 5px;
        }
        & input {
            width: 100%;
            border: 1px solid #969696;
            border-radius: 12px;
            padding: 10px 15px;
        }
    }
}

.save {
    width: 100%;
    max-width: 250px;
    margin: 30px auto 0px;
}
</style>