<script setup lang="ts">
import ComputerIcon from '@/components/icons/IconComputer.vue'
import { MdAdd } from "oh-vue-icons/icons";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { defineComponent } from "vue";
import ProjectCard from '@/components/ProjectCard.vue'
import { ref } from 'vue';
import DialogProjectForm from '@/components/DialogProjectForm.vue';

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

</script>
<template>
  <div class="w-full h-full flex flex-col items-center py-10 px-5 gap-14 relative md:px-14">
    <header class="w-full flex flex-col items-center justify-center gap-7">
      <ComputerIcon class="md:w-16 md:h-16" />
      <div class="flex flex-col w-full gap-4">
        <div class="text-center text-xl font-bold md:text-2xl">
          <p>
            Bem vindo ao seu
          </p>
          <span class="bg-primary p-1 rounded-lg">Organizador de projetos</span>
        </div>
        <p class="text-center text-xs text-muted-fg md:text-base">
          Desenvolveu ou participou de um projeto? Adicione e gerencie aqui!
        </p>
      </div>
    </header>
    <main class="w-full h-full flex flex-col gap-10">
      <div class="w-full lg:flex gap-10 items-center">
        <input type="text" placeholder="O que deseja procurar?"
          class="border border-border bg-transparent w-full rounded-lg px-3 py-2 text-sm h-10 outline-none md:py-6 md:text-base">
        <button class="hidden lg:flex items-center px-3 bg-primary">
          <OhVueIcon name="md-add" class="size-6" />
          Adicionar projeto
        </button>
      </div>
      <div class="w-full grid grid-cols-1 gap-7">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
      <div class="fixed bottom-3 right-4 lg:hidden">
        <button class="bg-primary p-5 rounded-full flex justify-center items-center" @click="isModalOpen = true">
          <OhVueIcon name="md-add" class="size-6" />
        </button>
        <DialogProjectForm :is-modal-open="isModalOpen" :is-edit="false" @update:isModalOpen="updateIsModalOpen" />
      </div>
    </main>
  </div>
</template>
