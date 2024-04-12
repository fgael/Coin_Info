<template>
  <v-btn
    :color="entryProps.color"
    :prepend-icon="entryProps.icon"
    variant="flat"
  >
    {{ entryProps.title }}
  </v-btn>
</template>

<script setup lang="ts">
interface UserProps {
  title: string;
  icon: string;
  color: string;
}

const entryProps = defineProps<UserProps>();
</script>
