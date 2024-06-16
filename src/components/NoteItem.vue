<script setup lang="ts">
import type { note as Note } from '@/types/note'
import { useNotesStore } from '@/store/notes'
import { computed, reactive, type Ref } from 'vue'

const props = defineProps({
  note: {
    type: Object as () => Note,
    required: true
  }
})
const note: Ref<Note> = computed(() => ({ ...props.note }))

const noteStore = useNotesStore()

const deleteNote = (note: Note) => {
  noteStore.DeleteNoteOnContentScript(note)
  setTimeout(() => noteStore.getNotesFromSyncStorage(), 500)
}
const backgroundColor = computed(() => (note.value.color ? note.value.color : 'success'))

const state = reactive({
  confirmDelete: false
})

const editNote = (note: Note) => {
  const text = prompt('Enter note text:', note.text || '')
  if (text) {
    const newNote = { ...note, text }
    noteStore.editNoteOnContentScript(newNote)
    setTimeout(() => noteStore.getNotesFromSyncStorage(), 500)
  }
}
</script>

<template>
  <v-card :color="backgroundColor" class="mx-4 my-2">
    <v-card-item>
      <v-card-title>{{ note.text }}</v-card-title>
      <v-card-subtitle>
        <v-scroll-y-reverse-transition mode="out-in">
          <div v-if="state.confirmDelete" class="text-caption">本当に削除しますか?</div>
          <div v-else class="text-caption">
            <div>{{ note.id.username }} {{ note.id.channelName }}</div>
            <div>{{ note.id.messageText }}</div>
          </div>
        </v-scroll-y-reverse-transition>
      </v-card-subtitle>
      <template v-slot:append>
        <v-fade-transition mode="in-out">
          <v-col class="d-flex justify-end">
            <v-row class="mt-3 justify-end">
              <div v-if="state.confirmDelete">
                <v-btn
                  icon="mdi-close"
                  size="small"
                  variant="outlined"
                  class="mr-3"
                  @click="state.confirmDelete = false"
                ></v-btn>
                <v-btn
                  icon="mdi-check"
                  size="small"
                  variant="outlined"
                  @click="deleteNote(note)"
                ></v-btn>
              </div>
              <div v-else>
                <v-btn
                  icon="mdi-delete"
                  size="small"
                  variant="outlined"
                  class="mr-3"
                  @click="state.confirmDelete = true"
                ></v-btn>
                <v-btn
                  icon="mdi-pencil"
                  size="small"
                  variant="outlined"
                  @click="editNote(note)"
                ></v-btn>
              </div>
            </v-row>
          </v-col>
        </v-fade-transition>
      </template>
    </v-card-item>
  </v-card>
</template>

<style></style>
