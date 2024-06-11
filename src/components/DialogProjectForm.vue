<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import Dialog from 'primevue/dialog';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import api from '@/services/api';
import { useToast } from 'primevue/usetoast';


interface IProjectFormValues {
    projectName: string;
    role: string;
    tech: string;
    initialDate: Date;
    finalDate?: Date;
    hours: number;
    link?: string;
    description: string;
}

const props = defineProps({
    isModalOpen: {
        type: Boolean,
        default: false
    },
    isEdit: Boolean,
    getAllProjects: Function,
    project: Object
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

const toast = useToast();

const projectFormSchema = yup.object({
    projectName: yup.string().required("Nome do projeto é obrigatório").min(3, "Nome do projeto deve ter no mínimo 3 caracteres"),
    role: yup.string().required("Função principal é obrigatória").min(3, "Função principal deve ter no mínimo 3 caracteres"),
    tech: yup.string().required("Tecnologia é obrigatória"),
    initialDate: yup.date().required("Data inicial é obrigatória"),
    finalDate: yup.date().when('status', {
        is: true,
        then: yup.date().required("Data final é obrigatória").min(yup.ref('initialDate'), "Data final deve ser maior que a data inicial")
    }),
    hours: yup.number().required("Horas trabalhadas é obrigatório").min(1, "Horas trabalhadas deve ser maior que 0"),
    link: yup.string().url("Link do projeto deve ser uma URL válida"),
    description: yup.string().required("Descrição é obrigatória").min(3, "Descrição do projeto deve ter no mínimo 3 caracteres").max(400, "Descrição do projeto deve ter no máximo 400 caracteres"),
    status: yup.boolean().default(false)
});

const submitForm = async (values: IProjectFormValues) => {
    const valuesFormatted = {
        ...values,
        status: status.value
    };
    try {
        await api.post('/projects', valuesFormatted);
        toast.add({ severity: 'success', summary: 'Projeto cadastrado com sucesso', life: 3000 });
        props.getAllProjects?.();
    } catch (error) {
        console.error(error);
        toast.add({ severity: 'error', summary: 'Erro ao cadastrar projeto', life: 3000 });
    }
    closeModal();
};

const status = ref(false);

</script>

<template>
    <Dialog v-model:visible="localIsModalOpen" modal :header="isEdit ? 'Editar projeto' : 'Cadastrar projeto'"
        class="!bg-popover !text-white !w-10/12 !border-border lg:!w-8/12 xl:!w-6/12">
        <div class="flex flex-col gap-9">
            <span class="text-muted-fg">
                {{ isEdit ? 'Atualize as informações do projeto' : 'Preencha os campos abaixo para cadastrar um projeto'
                }}
            </span>
            <Form v-slot="{ errors }" @submit="submitForm" :validation-projectFormSchema="projectFormSchema"
                class="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <div class="flex items-center gap-3 xl:col-span-2">
                    <Field type="checkbox" name="status" id="status" class="" :value="true" v-model="status"></Field>
                    <label for="status" class="font-semibold text-sm md:text-base">Continuo
                        participando do
                        projeto</label>
                    <ErrorMessage name="status" class="text-sm text-destructive" />
                </div>
                <div class="flex flex-col gap-3 xl:col-span-2">
                    <label for="projectName" class="font-semibold">Nome do projeto</label>
                    <Field type="text" name="projectName" id="projectName"
                        class="border border-border bg-transparent w-full rounded-lg px-3 py-2 text-sm h-10 outline-none md:py-6 md:text-base"
                        placeholder="Insira o nome do projeto"></Field>
                    <ErrorMessage name="projectName" class="text-sm text-destructive" />
                </div>
                <div class="flex flex-col gap-3">
                    <label for="role" class="font-semibold">Função principal</label>
                    <Field type="text" name="role" id="role"
                        class="border border-border bg-transparent w-full rounded-lg px-3 py-2 text-sm h-10 outline-none md:py-6 md:text-base"
                        placeholder="Insira a sua função principal"></Field>
                    <ErrorMessage name="role" class="text-sm text-destructive" />
                </div>
                <div class="flex flex-col gap-3">
                    <label for="tech" class="font-semibold">Principal tecnologia que usou</label>
                    <Field type="text" name="tech" id="tech"
                        class="border border-border bg-transparent w-full rounded-lg px-3 py-2 text-sm h-10 outline-none md:py-6 md:text-base"
                        placeholder="Insira a principal tecnologia"></Field>
                    <ErrorMessage name="tech" class="text-sm text-destructive" />
                </div>
                <div class="flex flex-col gap-3">
                    <label for="initialDate" class="font-semibold">Data inicial</label>
                    <Field type="date" name="initialDate" id="initialDate"
                        class="border border-border bg-transparent w-full rounded-lg px-3 py-2 text-sm h-10 outline-none md:py-6 md:text-base"
                        placeholder="Insira a data inicial"></Field>
                    <ErrorMessage name="initialDate" class="text-sm text-destructive" />
                </div>
                <div class="flex flex-col gap-3" v-if="!status">
                    <label for="finalDate" class="font-semibold">Data final</label>
                    <Field type="date" name="finalDate" id="finalDate" :disabled="status"
                        class="border border-border bg-transparent w-full rounded-lg px-3 py-2 text-sm h-10 outline-none md:py-6 md:text-base"
                        placeholder="Insira a data final"></Field>
                    <ErrorMessage name="finalDate" class="text-sm text-destructive" />
                </div>
                <div class="flex flex-col gap-3" v-if="!status">
                    <label for="hours" class="font-semibold">Horas trabalhadas</label>
                    <Field type="number" name="hours" id="hours" :disabled="status"
                        class="border border-border bg-transparent w-full rounded-lg px-3 py-2 text-sm h-10 outline-none md:py-6 md:text-base"
                        placeholder="Insira suas horas trabalhadas"></Field>
                    <ErrorMessage name="hours" class="text-sm text-destructive" />
                </div>
                <div class="flex flex-col gap-3">
                    <label for="link" class="font-semibold">Link do projeto</label>
                    <Field type="text" name="link" id="link"
                        class="border border-border bg-transparent w-full rounded-lg px-3 py-2 text-sm h-10 outline-none md:py-6 md:text-base"
                        placeholder="Insira o link do projeto"></Field>
                    <ErrorMessage name="link" class="text-sm text-destructive" />
                </div>
                <div class="flex flex-col gap-3 xl:col-span-2">
                    <label for="description" class="font-semibold">Descrição</label>
                    <Field as="textarea" maxlength="400" name="description" id="description"
                        class="border border-border bg-transparent w-full rounded-lg px-3 py-2 text-sm h-36 outline-none md:text-base xl:h-48"
                        placeholder="Insira a descrição do projeto"></Field>
                    <ErrorMessage name="description" class="text-sm text-destructive" />
                </div>
                <div class="flex justify-end gap-2 mt-3 xl:col-span-2">
                    <button type="button"
                        class="px-4 py-2 bg-background border border-border rounded-md font-semibold hover:bg-primary transition-colors"
                        @click="closeModal">Cancelar</button>
                    <button type="submit"
                        class="px-4 py-2 bg-primary border border-border rounded-md font-semibold hover:bg-primary/75 transition-colors">Salvar</button>
                </div>
            </Form>
        </div>
    </Dialog>
</template>