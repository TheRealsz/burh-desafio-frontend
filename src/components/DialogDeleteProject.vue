<script setup lang="ts">
import { watch, ref, defineProps } from 'vue';
import Dialog from 'primevue/dialog';

const props = defineProps({
    isDeleteModalOpen: {
        type: Boolean,
        default: false
    },
});
const emits = defineEmits(['update:isModalOpen', 'close']);

const localIsModalOpen = ref(props.isDeleteModalOpen);

watch(() => props.isDeleteModalOpen, (newValue) => {
    localIsModalOpen.value = newValue;
});

watch(localIsModalOpen, (newValue) => {
    emits('update:isModalOpen', newValue);
});

const closeModal = () => {
    localIsModalOpen.value = false;
    emits('close');
};

</script>

<template>
    <Dialog v-model:visible="localIsModalOpen" modal header="Deletar projeto"
        class="!bg-popover !text-white !w-10/12 !border-border lg:!w-8/12 xl:!w-4/12">
        <div class="flex flex-col gap-3 w-full">
            <span class="text-muted-fg">
                Tem certeza que deseja deletar o projeto?
            </span>
            <div class="flex justify-end gap-2 mt-3">
                <button type="button"
                    class="px-4 py-2 bg-background border border-border rounded-md font-semibold hover:bg-primary transition-colors"
                    @click="closeModal">Cancelar</button>
                <button type="button"
                    class="px-4 py-2 bg-destructive border border-border rounded-md font-semibold hover:bg-destructive/75 transition-colors"
                    @click="closeModal">Deletar</button>
            </div>
        </div>
    </Dialog>
</template>