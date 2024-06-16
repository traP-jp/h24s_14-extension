import type { note } from './note'

type message = {
  method: 'edit' | 'delete'
  content: note
}
