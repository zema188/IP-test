<script setup>
import IconClose from '@/components/icons/IconClose.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})

</script>

<template>
    <div class="user"
        @click="$emit('getFullInfo', props.user)"
    >
        <div class="user__pic">
            <img :src="props.user.avatar"/>
        </div>
        <div class="user__info">
            <p class="user__name">
                {{ props.user.first_name }}
                {{ props.user.last_name }}
            </p>
            <!-- <p class="user__email">
                {{ props.user.email }}
            </p> -->
        </div>
        <div class="user__btns">
            <button class="user__btns-delete"
                @click.stop="$emit('editUser', props.user)"
            >
                <icon-edit/>
            </button>
            <button class="user__btns-delete"
                @click.stop="$emit('deleteUser', props.user.id)"
            >
                <icon-close/>
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.user {
    display: flex;
    gap: 10px;
    background: #e8ecef52;
    width: 100%;
    max-width: 500px;
    padding: 10px 150px 10px 10px;
    border-radius: 10px;
    cursor: pointer;
    position: relative;
    &:not(:last-child) {
        margin-bottom: 10px;
    }
    &__pic {
        & img {
            border-radius: 10px;
        }
    }

    &__name {
        font-weight: bold;
    }

    &__btns {
        display: flex;
        gap: 5px;
        position: absolute;
        right: 10px;
        top: 10px;
        & button {
            display: flex;
        }
    }

    &__btns-delete {
        &:hover {
            & svg {
                transform: scale(1.1);
            }
        }
        & svg {
            transition: .2s;
            width: 25px;
        }
    }
}
</style>