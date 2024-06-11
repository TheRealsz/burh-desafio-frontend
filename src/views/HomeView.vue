<script setup lang="ts">
import ComputerIcon from '@/components/icons/IconComputer.vue'
import { MdAdd } from "oh-vue-icons/icons";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { defineComponent } from "vue";
import ProjectCard from '@/components/ProjectCard.vue'
import { ref, onMounted } from 'vue';
import DialogProjectForm from '@/components/DialogProjectForm.vue';
import Toast from 'primevue/toast';
import api from '@/services/api';
import { useToast } from 'primevue/usetoast';

export interface IProject {
  _id: string;
  projectName: string;
  role: string;
  tech: string;
  initialDate: Date;
  finalDate?: Date;
  hours: number;
  link?: string;
  description: string;
  status: string;
}

addIcons(MdAdd);

defineComponent({
  components: {
    OhVueIcon,
  },
});

const isModalOpen = ref(false);

const updateIsModalOpen = (newValue: boolean) => {
  isModalOpen.value = newValue;
};

const projects = ref<IProject[]>([])
const toast = useToast();

const getAllProjects = async () => {
  try {
    const response = await api.get('/projects');
    projects.value = response.data;
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao buscar projetos' });
  }
}

onMounted(() => {
  getAllProjects();
});

</script>
<template>
  <div class="w-full h-full flex flex-col items-center py-10 px-5 gap-14 relative md:px-14 xl:max-w-screen-xl">
    <Toast />
    <header class="w-full flex flex-col items-center justify-center gap-7">
      <ComputerIcon class="md:w-16 md:h-16 xl:w-20 xl:h-20" />
      <div class="flex flex-col w-full gap-4">
        <div class="text-center text-xl font-bold md:text-2xl xl:text-3xl">
          <p>
            Bem vindo ao seu
          </p>
          <span class="bg-primary p-1 rounded-lg">Organizador de projetos</span>
        </div>
        <p class="text-center text-xs text-muted-fg md:text-base xl:text-lg">
          Desenvolveu ou participou de um projeto? Adicione e gerencie aqui!
        </p>
      </div>
    </header>
    <main class="w-full h-full flex flex-col gap-10">
      <div class="w-full lg:flex gap-10 items-center">
        <input type="text" placeholder="O que deseja procurar?"
          class="border border-border bg-transparent w-full rounded-lg px-3 py-2 text-sm h-10 outline-none md:py-6 md:text-base xl:text-lg xl:py-7">
        <button
          class="hidden lg:flex items-center font-semibold px-3 bg-primary py-3 w-72 rounded-md xl:py-4 xl:text-lg hover:bg-primary/75 transition-colors"
          @click="isModalOpen = true">
          <OhVueIcon name="md-add" class="size-6" />
          <span class="flex-1">
            Adicionar projeto
          </span>
        </button>
      </div>
      <div class="w-full mb-5 grid grid-cols-1 gap-7 lg:grid-cols-2" v-if="projects.length > 0">
        <ProjectCard v-for="project in projects" :key="project._id" :project="project"
          :getAllProjects="getAllProjects" />
      </div>
      <p class="text-muted-fg text-center h-full flex flex-col items-center justify-center gap-3" v-else>
        <span class="text-3xl">
          😔
        </span>
        Nenhum projeto cadastrado até o momento
      </p>
      <div class="fixed bottom-3 right-4 lg:hidden">
        <button class="bg-primary p-5 rounded-full flex justify-center items-center" @click="isModalOpen = true">
          <OhVueIcon name="md-add" class="size-6" />
        </button>
        <DialogProjectForm :is-modal-open="isModalOpen" :is-edit="false" @update:isModalOpen="updateIsModalOpen"
          :get-all-projects="getAllProjects" />
      </div>
    </main>
  </div>
</template>
