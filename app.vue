<template>
  <div class="min-h-screen bg-background">
    <header class="border-b border-border bg-card">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span class="text-primary-foreground font-bold text-lg">M</span>
              </div>
              <h1 class="text-xl font-semibold text-foreground">Markdown Converter</h1>
            </div>
          </div>
          <UButton color="white" variant="solid">
            Get Started
          </UButton>
        </div>
      </div>
    </header>

    <main class="container mx-auto p-4">
      <MarkdownConverter />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#app';

useHead({
  title: 'Markdown to HTML Converter',
  meta: [
    { name: 'description', content: 'Convert markdown to HTML in real-time' }
  ]
})
</script>
