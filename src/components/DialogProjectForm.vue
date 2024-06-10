<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import Dialog from 'primevue/dialog';

const props = defineProps({
    isModalOpen: {
        type: Boolean,
        default: false
    },
    isEdit: Boolean
});

const emits = defineEmits(['update:isModalOpen', 'close']);

const localIsModalOpen = ref(props.isModalOpen);

watch(() => props.isModalOpen, (newValue) => {
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
    <Dialog v-model:visible="localIsModalOpen" :modal="true" :header="isEdit ? 'Editar projeto' : 'Cadastrar projeto'"
        class="!bg-popover !text-white !w-10/12 !border-border lg:!w-8/12 xl:!w-6/12">
        <div class="flex flex-col gap-9">
            <span class="text-muted-fg">
                {{ isEdit ? 'Atualize as informações do projeto' : 'Preencha os campos abaixo para cadastrar um projeto'
                }}
            </span>
            <form class="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <div class="flex items-center gap-3 xl:col-span-2">
                    <input type="checkbox" name="" id="" class="">
                    <label for="email" class="font-semibold text-sm md:text-base">Continuo participando do
                        projeto</label>
                </div>
                <div class="flex flex-col gap-3">
                    <label for="username" class="font-semibold">Nome do projeto</label>
                    <input type="text" name="" id=""
                        class="border border-border bg-transparent w-full rounded-lg px-3 py-2 text-sm h-10 outline-none md:py-6 md:text-base"
                        placeholder="Insira o nome do projeto">
                </div>
                <div class="flex flex-col gap-3">
                    <label for="email" class="font-semibold">Função principal</label>
                    <input type="text" name="" id=""
                        class="border border-border bg-transparent w-full rounded-lg px-3 py-2 text-sm h-10 outline-none md:py-6 md:text-base"
                        placeholder="Insira a sua função principal">
                </div>
                <div class="flex flex-col gap-3">
                    <label for="email" class="font-semibold">Principal tecnologia que usou</label>
                    <input type="text" name="" id=""
                        class="border border-border bg-transparent w-full rounded-lg px-3 py-2 text-sm h-10 outline-none md:py-6 md:text-base"
                        placeholder="Insira a principal tecnologia">
                </div>
                <div class="flex flex-col gap-3">
                    <label for="email" class="font-semibold">Horas trabalhadas</label>
                    <input type="text" name="" id=""
                        class="border border-border bg-transparent w-full rounded-lg px-3 py-2 text-sm h-10 outline-none md:py-6 md:text-base"
                        placeholder="Insira suas horas trabalhadas">
                </div>
                <div class="flex flex-col gap-3 xl:col-span-2">
                    <label for="email" class="font-semibold">Link do projeto</label>
                    <input type="text" name="" id=""
                        class="border border-border bg-transparent w-full rounded-lg px-3 py-2 text-sm h-10 outline-none md:py-6 md:text-base"
                        placeholder="Insira o link do projeto">
                </div>
                <div class="flex flex-col gap-3 xl:col-span-2">
                    <label for="email" class="font-semibold">Descriçao</label>
                    <textarea maxlength="400" name="" id=""
                        class="border border-border bg-transparent w-full rounded-lg px-3 py-2 text-sm h-36 outline-none md:text-base xl:h-48"
                        placeholder="Insira a descrição do projeto" />
                </div>
                <div class="flex justify-end gap-2 mt-3 xl:col-span-2">
                    <button type="button"
                        class="px-4 py-2 bg-background border border-border rounded-md font-semibold hover:bg-primary transition-colors"
                        @click="closeModal">Cancelar</button>
                    <button type="button"
                        class="px-4 py-2 bg-primary border border-border rounded-md font-semibold hover:bg-primary/75 transition-colors"
                        @click="closeModal">Salvar</button>
                </div>
            </form>
        </div>
    </Dialog>
</template>