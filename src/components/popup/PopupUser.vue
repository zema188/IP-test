<script setup>
import { ref } from 'vue'
import ThePopup from '@/components/layouts/ThePopup.vue'

const props = defineProps({
    user: {
        type: Object,
        required: true,
        default: {}
    }
})

const namePopup = ref('userInfo')

</script>

<template>
    <the-popup
        :name="namePopup"
    >
        <div class="content">
            <div class="content__pic">
                <img :src="props.user.avatar"/>
            </div>
            <p class="content__name">
                {{ props.user.first_name }}
                {{ props.user.last_name }}
            </p>
            <p class="content__mail">
                {{ props.user.email }}
            </p>
            <p class="content__id">
                id: {{ props.user.id }}
            </p>
        </div>
    </the-popup>
</template>

<style lang="scss" scoped>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
&__pic {
    & img {
        width: 100%;
        border-radius: 12px;
    }
}

&__name {
}

&__mail {
}
}


</style>