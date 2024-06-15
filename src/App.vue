<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <v-btn @click="createNote">＋</v-btn>
          <v-list>
            <v-list-item v-for="note in notes" :key="note.id">
              <v-list-item-content>
                <v-list-item-title>{{ note.text }}</v-list-item-title>
                <v-list-item-subtitle>{{ note.timestamp }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click="deleteNote(note.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'

interface Note {
  id: number
  text: string
  timestamp: string
}

const notes: Ref<Note[]> = ref([])

const createNote = () => {
  const text = prompt('Enter note text:')
  if (text) {
    const newNote: Note = {
      id: Date.now(),
      text: text,
      timestamp: new Date().toLocaleString()
    }
    notes.value.push(newNote)
  }
}

const deleteNote = (id: number) => {
  notes.value = notes.value.filter((note) => note.id !== id)
}
</script>

<style></style>
