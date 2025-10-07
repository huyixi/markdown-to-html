<template>
  <div class="grid lg:grid-cols-2 gap-4 h-[calc(100vh-140px)]">
     Left Panel - Markdown Input 
    <UCard class="flex flex-col h-full">
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-foreground">Markdown Input</h2>
          <div class="flex gap-2">
            <UButton 
              size="xs" 
              color="gray" 
              variant="ghost"
              @click="clearMarkdown"
            >
              Clear
            </UButton>
            <UButton 
              size="xs" 
              color="gray" 
              variant="ghost"
              @click="loadSample"
            >
              Load Sample
            </UButton>
          </div>
        </div>
      </template>

      <UTextarea
        v-model="markdown"
        :rows="25"
        placeholder="Enter your markdown here..."
        class="font-mono text-sm flex-1"
        autoresize
      />
    </UCard>

     Right Panel - HTML Output 
    <UCard class="flex flex-col h-full">
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-foreground">Output</h2>
          <UTabs v-model="activeTab" :items="tabs" class="w-auto" />
        </div>
      </template>

       Preview Tab 
      <div v-if="activeTab === 0" class="prose prose-invert max-w-none p-4 overflow-auto flex-1">
        <div v-html="htmlOutput" />
      </div>

       HTML Code Tab 
      <div v-else class="flex-1 overflow-auto">
        <UTextarea
          :model-value="htmlOutput"
          :rows="25"
          readonly
          class="font-mono text-sm"
        />
        <div class="mt-2 flex justify-end">
          <UButton 
            size="sm" 
            color="primary"
            @click="copyToClipboard"
          >
            {{ copied ? 'Copied!' : 'Copy HTML' }}
          </UButton>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { marked } from 'marked'

const markdown = ref(`# Welcome to Markdown Converter

This is a **powerful** markdown to HTML converter built with Nuxt.js and NuxtUI.

## Features

- Real-time conversion
- Dual-pane layout
- Preview and code view
- Copy to clipboard

### Code Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

### Lists

- Item 1
- Item 2
- Item 3

### Links

[Visit Nuxt](https://nuxt.com)

> This is a blockquote
`)

const activeTab = ref(0)
const copied = ref(false)

const tabs = [
  { label: 'Preview' },
  { label: 'HTML Code' }
]

const htmlOutput = computed(() => {
  try {
    return marked(markdown.value)
  } catch (error) {
    return '<p class="text-red-500">Error parsing markdown</p>'
  }
})

const clearMarkdown = () => {
  markdown.value = ''
}

const loadSample = () => {
  markdown.value = `# Sample Document

## Introduction

This is a sample markdown document with various elements.

### Text Formatting

You can make text **bold**, *italic*, or ***both***.

### Code

Inline code: \`const x = 10;\`

Block code:

\`\`\`typescript
interface User {
  name: string;
  email: string;
}
\`\`\`

### Lists

Ordered list:
1. First item
2. Second item
3. Third item

Unordered list:
- Apple
- Banana
- Orange

### Links and Images

[Nuxt Documentation](https://nuxt.com/docs)

### Blockquotes

> "The best way to predict the future is to invent it."
> - Alan Kay

### Tables

| Feature | Status |
|---------|--------|
| Preview | ✅ |
| Export  | ✅ |
| Share   | ✅ |
`
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(htmlOutput.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (error) {
    console.error('Failed to copy:', error)
  }
}
</script>

<style scoped>
:deep(.prose) {
  color: hsl(var(--color-foreground));
}

:deep(.prose h1),
:deep(.prose h2),
:deep(.prose h3),
:deep(.prose h4) {
  color: hsl(var(--color-foreground));
  font-weight: 600;
}

:deep(.prose a) {
  color: hsl(var(--color-primary));
  text-decoration: none;
}

:deep(.prose a:hover) {
  text-decoration: underline;
}

:deep(.prose code) {
  background: hsl(var(--color-muted));
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

:deep(.prose pre) {
  background: hsl(var(--color-muted));
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
}

:deep(.prose blockquote) {
  border-left: 4px solid hsl(var(--color-primary));
  padding-left: 1rem;
  font-style: italic;
  color: hsl(var(--color-muted-foreground));
}

:deep(.prose table) {
  width: 100%;
  border-collapse: collapse;
}

:deep(.prose th),
:deep(.prose td) {
  border: 1px solid hsl(var(--color-border));
  padding: 0.5rem;
  text-align: left;
}

:deep(.prose th) {
  background: hsl(var(--color-muted));
  font-weight: 600;
}
</style>
