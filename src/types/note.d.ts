export type noteId = {
  username: string
  time: string
  messageText: string
  channelName: string
}

export type note = {
  id: noteId
  text: string
  color: string
  creationTimestamp: string
}
