<script setup lang="ts">
import ComputerIcon from '@/components/icons/IconComputer.vue'
import { MdAdd } from "oh-vue-icons/icons";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { defineComponent } from "vue";
import ProjectCard from '@/components/ProjectCard.vue'

addIcons(MdAdd);

defineComponent({
  components: {
    OhVueIcon,
  },
});

</script>

<template>
  <div class="w-full h-full flex flex-col items-center py-10 px-5 gap-14 relative">
    <header class="w-full flex flex-col items-center justify-center gap-7">
      <ComputerIcon />
      <div class="flex flex-col w-full gap-4">
        <p class="text-center text-xl font-bold">
          Bem vindo ao seu <span class="bg-primary p-1 rounded-lg">Organizador de projetos</span>
        </p>
        <p class="text-center text-xs text-muted-fg">
          Desenvolveu ou participou de um projeto? Adicione aqui para compartilhar com a comunidade.
        </p>
      </div>
    </header>
    <main class="w-full h-full flex flex-col gap-10">
      <div class="w-full">
        <input type="text" placeholder="O que deseja procurar?"
          class="border border-border bg-transparent w-full rounded-lg px-3 py-2 text-sm h-10 outline-none">
      </div>
      <div class="w-full grid grid-cols-1 gap-7">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
      <div class="fixed bottom-3 right-4">
        <button class="bg-primary p-5 rounded-full flex justify-center items-center">
          <OhVueIcon name="md-add" class="size-6" />
        </button>
      </div>
    </main>
  </div>
</template>
