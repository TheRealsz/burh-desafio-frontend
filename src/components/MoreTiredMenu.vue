<script setup lang="ts">
import TieredMenu from 'primevue/tieredmenu';
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import { MdMorevert } from "oh-vue-icons/icons";
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { defineComponent } from "vue";
import DialogProjectForm from './DialogProjectForm.vue';


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
    <Dialog v-model:visible="isDeleteModalOpen" modal header="Deletar projeto"
        class="!bg-popover !text-white !w-10/12 !border-border lg:!w-8/12 xl:!w-4/12">
        <div class="flex flex-col gap-3 w-full">
            <span class="text-muted-fg">
                Tem certeza que deseja deletar o projeto?
            </span>
            <div class="flex justify-end gap-2 mt-3">
                <button type="button"
                    class="px-4 py-2 bg-background border border-border rounded-md font-semibold hover:bg-primary transition-colors"
                    @click="isDeleteModalOpen = false">Cancelar</button>
                <button type="button"
                    class="px-4 py-2 bg-destructive border border-border rounded-md font-semibold hover:bg-destructive/75 transition-colors"
                    @click="isDeleteModalOpen = false">Deletar</button>
            </div>
        </div>
    </Dialog>
</template>