export type noteId = {
  username: string
  time: string
  messageText: string
  channelName: string
}

export type note = {
  id: noteId
  text: string | null
  color: string | null
  creationTimestamp: string
}
