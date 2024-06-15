<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { useNotesStore } from '@/store/notes'
import NoteItem from './NoteItem.vue'

const currentPage = ref(1)
const paginationLength = 4
const noteLintLength = 5
const { notes } = storeToRefs(useNotesStore())

const paginatedNotes = computed(() => {
  const start = (currentPage.value - 1) * noteLintLength
  const end = start + noteLintLength
  return notes.value.slice(start, end)
})

notes.value = [
  {
    id: {
      username: 'user1',
      time: '2024-06-15T08:00:00Z',
      messageText: 'Hello World!',
      channelName: '#general'
    },
    text: 'This is the first note.',
    color: 'blue',
    creationTimestamp: '2024-06-15T08:00:00Z'
  },
  {
    id: {
      username: 'user2',
      time: '2024-06-15T09:00:00Z',
      messageText: 'Good morning!',
      channelName: '#random'
    },
    text: 'This is the second note.',
    color: 'green',
    creationTimestamp: '2024-06-15T09:00:00Z'
  },
  {
    id: {
      username: 'user3',
      time: '2024-06-15T10:00:00Z',
      messageText: 'How are you?',
      channelName: '#help'
    },
    text: null,
    color: null,
    creationTimestamp: '2024-06-15T10:00:00Z'
  },
  {
    id: {
      username: 'user4',
      time: '2024-06-15T11:00:00Z',
      messageText: "What's up?",
      channelName: '#general'
    },
    text: 'This is the fourth note.',
    color: 'red',
    creationTimestamp: '2024-06-15T11:00:00Z'
  },
  {
    id: {
      username: 'user5',
      time: '2024-06-15T12:00:00Z',
      messageText: "Let's meet at 2 PM.",
      channelName: '#meetings'
    },
    text: 'Meeting at 2 PM.',
    color: 'yellow',
    creationTimestamp: '2024-06-15T12:00:00Z'
  },
  {
    id: {
      username: 'user6',
      time: '2024-06-15T13:00:00Z',
      messageText: 'Lunch time!',
      channelName: '#random'
    },
    text: 'Having lunch.',
    color: 'orange',
    creationTimestamp: '2024-06-15T13:00:00Z'
  },
  {
    id: {
      username: 'user7',
      time: '2024-06-15T14:00:00Z',
      messageText: 'Any updates?',
      channelName: '#updates'
    },
    text: null,
    color: null,
    creationTimestamp: '2024-06-15T14:00:00Z'
  },
  {
    id: {
      username: 'user8',
      time: '2024-06-15T15:00:00Z',
      messageText: 'Check this out!',
      channelName: '#general'
    },
    text: 'Interesting link shared.',
    color: 'purple',
    creationTimestamp: '2024-06-15T15:00:00Z'
  },
  {
    id: {
      username: 'user9',
      time: '2024-06-15T16:00:00Z',
      messageText: "Let's start the project.",
      channelName: '#projects'
    },
    text: 'Starting the new project.',
    color: 'pink',
    creationTimestamp: '2024-06-15T16:00:00Z'
  },
  {
    id: {
      username: 'user10',
      time: '2024-06-15T17:00:00Z',
      messageText: 'Review the document.',
      channelName: '#documents'
    },
    text: 'Document review required.',
    color: 'grey',
    creationTimestamp: '2024-06-15T17:00:00Z'
  },
  {
    id: {
      username: 'user11',
      time: '2024-06-15T18:00:00Z',
      messageText: 'Completed the task.',
      channelName: '#tasks'
    },
    text: 'Task completed successfully.',
    color: 'blue',
    creationTimestamp: '2024-06-15T18:00:00Z'
  },
  {
    id: {
      username: 'user12',
      time: '2024-06-15T19:00:00Z',
      messageText: 'Need help with this issue.',
      channelName: '#help'
    },
    text: null,
    color: null,
    creationTimestamp: '2024-06-15T19:00:00Z'
  },
  {
    id: {
      username: 'user13',
      time: '2024-06-15T20:00:00Z',
      messageText: 'Great job!',
      channelName: '#general'
    },
    text: 'Appreciation note.',
    color: 'green',
    creationTimestamp: '2024-06-15T20:00:00Z'
  },
  {
    id: {
      username: 'user14',
      time: '2024-06-15T21:00:00Z',
      messageText: 'Good night!',
      channelName: '#random'
    },
    text: 'End of the day.',
    color: 'black',
    creationTimestamp: '2024-06-15T21:00:00Z'
  },
  {
    id: {
      username: 'user15',
      time: '2024-06-15T22:00:00Z',
      messageText: 'Any questions?',
      channelName: '#questions'
    },
    text: null,
    color: null,
    creationTimestamp: '2024-06-15T22:00:00Z'
  },
  {
    id: {
      username: 'user16',
      time: '2024-06-15T23:00:00Z',
      messageText: 'See you tomorrow.',
      channelName: '#general'
    },
    text: 'Goodbye note.',
    color: 'white',
    creationTimestamp: '2024-06-15T23:00:00Z'
  },
  {
    id: {
      username: 'user17',
      time: '2024-06-16T00:00:00Z',
      messageText: 'Starting fresh!',
      channelName: '#general'
    },
    text: 'New day, new start.',
    color: 'blue',
    creationTimestamp: '2024-06-16T00:00:00Z'
  },
  {
    id: {
      username: 'user18',
      time: '2024-06-16T01:00:00Z',
      messageText: 'Update on the project.',
      channelName: '#projects'
    },
    text: 'Project update.',
    color: 'green',
    creationTimestamp: '2024-06-16T01:00:00Z'
  },
  {
    id: {
      username: 'user19',
      time: '2024-06-16T02:00:00Z',
      messageText: 'Reminder for the meeting.',
      channelName: '#meetings'
    },
    text: 'Meeting reminder.',
    color: 'red',
    creationTimestamp: '2024-06-16T02:00:00Z'
  },
  {
    id: {
      username: 'user20',
      time: '2024-06-16T03:00:00Z',
      messageText: 'Feedback required.',
      channelName: '#feedback'
    },
    text: 'Please provide feedback.',
    color: 'yellow',
    creationTimestamp: '2024-06-16T03:00:00Z'
  }
]
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-list>
          <v-list-item v-for="note in paginatedNotes" :key="JSON.stringify(note.id)" class="note-item">
            <v-card outlined shaped :elevation="3" :color="note.color" class="mb-s6">
              <v-card-text>
                <NoteItem :note="note" />
              </v-card-text>
            </v-card>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-pagination v-model="currentPage" :length="paginationLength"></v-pagination>
    </v-row>
  </v-container>
</template>

<style scoped></style>
