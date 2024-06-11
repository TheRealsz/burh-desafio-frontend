<script setup lang="ts">
import { defineProps } from 'vue';
import MoreTiredMenu from '@/components/MoreTiredMenu.vue'
import type { IProject } from '@/views/HomeView.vue'
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

defineProps<{
    project: IProject,
    getAllProjects: Function,
}>();

const formatDate = (dateValue: Date) => {
    const date = new Date(dateValue);

    const formattedDate = format(date, 'MMM yyyy', { locale: ptBR });
    return formattedDate.toUpperCase();
};


</script>

<template>
    <div class="w-full border border-border rounded-md flex flex-col gap-5 px-6 py-5">
        <div class="w-full flex flex-col gap-2">
            <div class="flex justify-between w-full items-center">
                <h3 class="font-bold md:text-lg">
                    {{ project.projectName }}
                </h3>
                <div class="card flex justify-center">
                    <MoreTiredMenu :getAllProjects="getAllProjects" :project="project" />
                </div>
            </div>
            <div class="w-full flex gap-1 flex-wrap text-xs">
                <div class="px-3 py-1 bg-secondary w-max rounded-full flex-wrap font-medium">
                    {{ project.role }}
                </div>
                <div class="px-3 py-1 bg-secondary w-max rounded-full flex-wrap font-medium">
                    {{ project.tech }}
                </div>
            </div>
        </div>
        <div class="flex-1">
            <p class="text-sm md:text-base">
                {{ project.description }}
            </p>
        </div>
        <div class="text-sm font-semibold md:text-base">
            <p v-if="project.link">
                Link do projeto: <a href="" class="font-normal underline text-accent">{{ project.link }}</a>
            </p>
            <p v-if="project.hours">
                Tempo em horas: <span class="font-normal">{{ project.hours }}</span>
            </p>
        </div>
        <div class="flex w-full justify-between items-center text-xs">
            <span class="text-muted-fg">
                {{ formatDate(project.initialDate) }} {{ project.finalDate ? ` - ${formatDate(project.finalDate)}` : ''
                }}
            </span>
            <div class="bg-primary px-2 py-1 rounded-full">
                {{ project.status ? 'Participando' : 'Finalizado' }}
            </div>
        </div>
    </div>
</template>
