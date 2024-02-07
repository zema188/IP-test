<script setup>
import { onMounted, ref } from 'vue';
import { usePopup } from '@/stores/popup'
import PopupUser from '@/components/popup/PopupUser.vue';

import UserEdit from '@/components/popup/UserEdit.vue';
import UserItem from './UserItem.vue';

const popupStore = usePopup()
const nameBD = import.meta.env.VITE_LOCALSTORAGE_NAME
const serverURL = import.meta.env.VITE_SERVER_URL


const users = ref([])
const currentUser = ref({})
const currentUserForUpdate = ref({})
let updateBtnIsDisabled = ref(false)

const initDataFromServer = async () => {
    try {
        updateBtnIsDisabled.value = true
        const response = await fetch(`${serverURL}/api/users?page=1`)
        const data = await response.json()

        if(data.data) {
            localStorage.setItem(nameBD, JSON.stringify(data.data))
            users.value = [...data.data]
        }
    } catch(err) {
        console.error(err)
    } finally {
        updateBtnIsDisabled.value = false
    }
}

const initDataFromDB = () => {
    users.value = [...JSON.parse(localStorage.getItem(nameBD))]
}

const getFullInfo = user => {
    currentUser.value = {...user}
    popupStore.disableScroll('userInfo')
}

const deleteUser = id => {
    users.value = users.value.filter(el => el.id !== id)
    updateDB()
}

const editUser = user => {
    currentUserForUpdate.value = {...user}
    popupStore.disableScroll('userEdit')
}

const updateUser = () => {
    const id = currentUserForUpdate.value.id
    const indexUserForUpdate = users.value.findIndex(user => user.id === id);

    users.value[indexUserForUpdate] = {...currentUserForUpdate.value}
    updateDB()
}

const updateDB = () => {
    localStorage.setItem(nameBD, JSON.stringify(users.value))
}
onMounted(() => {
    localStorage.getItem(nameBD) ? initDataFromDB() : initDataFromServer()
})
</script>

<template>
    <div class="users container">
        <button class="btn btn_blue update"
            :disabled="updateBtnIsDisabled"
            @click="initDataFromServer()"
        >
            Обновить список
        </button>
        <TransitionGroup class="users__list" name="list" tag="div">
            <user-item
                v-for="user of users" :key="user.id"
                :user="user"
                @getFullInfo="user => getFullInfo(user)"
                @deleteUser="id => deleteUser(id)"
                @editUser="user => editUser(user)"
            />
        </TransitionGroup>
    </div>
    <popup-user
        :user="currentUser"
    />
    <user-edit
        :user="currentUserForUpdate"
        @updateUser="updateUser()"
    />
</template>

<style lang="scss" scoped>
.users {
    &__list {
        padding: 0 0 10px 0;
    }
}
.update {
    margin: 20px 0;
    @media (max-width: 539px) {
        width: 100%;
    }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>