<script setup lang="ts">
import TieredMenu from 'primevue/tieredmenu';
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import { MdMorevert } from "oh-vue-icons/icons";
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { defineComponent } from "vue";
import DialogProjectForm from './DialogProjectForm.vue';
import DialogDeleteProject from './DialogDeleteProject.vue';


addIcons(MdMorevert);

defineComponent({
    components: {
        OhVueIcon,
    },
});


const menu = ref();
const items = ref([
    {
        label: 'Editar',
        icon: 'pi pi-file-edit',
    },
    {
        label: 'Deletar',
        icon: 'pi pi-trash',

    },
]);

const toggle = (event: MouseEvent) => {
    menu.value.toggle(event);
};

const updateIsModalOpen = (newValue: boolean) => {
    isModalOpen.value = newValue;
};


const isDeleteModalOpen = ref(false);
const isModalOpen = ref(false);
</script>

<template>
    <Button type="button" aria-haspopup="true" @click="toggle" aria-controls="overlay_tmenu"
        class="!p-0 bg-transparent border-none">
        <OhVueIcon name="md-morevert" class="size-6" />
    </Button>
    <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup
        class="text-white border !border-border p-2 !bg-popover">
        <template #item="{ item, props }">
            <a v-ripple class="flex items-center p-2 cursor-pointer hover:text-white transition-colors rounded-md"
                :class="{ 'hover:bg-primary': item.label == 'Editar', 'hover:bg-destructive': item.label != 'Editar' }"
                v-bind="props" @click="item.label == 'Editar' ? isModalOpen = true : isDeleteModalOpen = true">
                <span :class="item['icon']" />
                <span class="ml-2">{{ item.label }}</span>
            </a>
        </template>
    </TieredMenu>
    <DialogProjectForm :is-modal-open="isModalOpen" :is-edit="true" @update:isModalOpen="updateIsModalOpen" />
    <DialogDeleteProject :is-delete-modal-open="isDeleteModalOpen" @update:is-modal-open="updateIsModalOpen" />
</template>