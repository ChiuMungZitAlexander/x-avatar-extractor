<script setup lang="ts">
import type { IExtractAccountNameResponse } from '~/server/api/extract/[accountName]'

const accountName = ref("");
const extracting = ref(false)
const avatarUrl = ref("");

const onExtract = async () => {
  extracting.value = true;
  const res = await fetch(`/api/extract/${accountName.value}`)
  const data: IExtractAccountNameResponse = await res.json()

  if (data?.avatar) {
    avatarUrl.value = data.avatar
  }

  extracting.value = false;
}
</script>

<template>
  <div class="h-screen flex flex-col justify-center items-center">
    <div class="flex gap-2 md:flex-row flex-col">
      <UInput class="min-w-[220px]" color="primary" :disabled="extracting" placeholder="X (Twitter) accout name"
        variant="outline" v-model="accountName" />
      <UButton class="justify-center" :disabled="!accountName" :loading="extracting" @click="onExtract">{{
        extracting ?
          'Extracting' :
          'Extract!' }}</UButton>
    </div>

    <div class="text-center" v-if="avatarUrl">
      <p>{{ avatarUrl }}</p>
      <img class="w-20 h-20 inline" :src="avatarUrl" />
    </div>
  </div>
</template>
