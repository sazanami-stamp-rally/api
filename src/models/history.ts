interface HistoryItem {
  checkpointId: string
  checkpointName: string
  category: string
  checkinTime: Date
  cooldown: {
    ended: boolean
    remaining: number
  }
}

export { HistoryItem };
