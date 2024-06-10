<script setup lang="ts">
import MoreTiredMenu from '@/components/MoreTiredMenu.vue'
</script>

<template>
    <div class="w-full border border-border rounded-md flex flex-col gap-5 px-3 py-5">
        <div class="w-full flex flex-col gap-2">
            <div class="flex justify-between w-full items-center">
                <h3 class="font-bold md:text-lg">
                    Nome do projeto
                </h3>
                <div class="card flex justify-center">
                    <MoreTiredMenu />
                </div>
            </div>
            <div class="w-full flex gap-1 flex-wrap text-xs">
                <div class="px-3 py-1 bg-secondary w-max rounded-full flex-wrap font-medium">
                    Desenvolvedor Front-end
                </div>
                <div class="px-3 py-1 bg-secondary w-max rounded-full flex-wrap font-medium">
                    ReactJs
                </div>
            </div>
        </div>
        <div>
            <p class="text-sm md:text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem distinctio tempora veniam omnis
                iure eaque expedita et magnam quaerat, inventore aliquam ab ullam voluptas dolores quam laboriosam?
                Dolore, eligendi debitis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
                distinctio tempora veniam omnis
                iure eaque expedita et magnam quaerat.
            </p>
        </div>
        <div class="text-sm font-semibold md:text-base">
            <p>
                Link do projeto: <a href="" class="font-normal underline text-accent">Teste</a>
            </p>
            <p>
                Tempo em horas: <span class="font-normal">100</span>
            </p>
        </div>
        <div class="flex w-full justify-between items-center text-xs">
            <span class="text-muted-fg">
                Jan 2024 - Jan 2025
            </span>
            <div class="bg-primary px-2 py-1 rounded-full">
                Participando
            </div>
        </div>
    </div>
</template>
