interface HistoryItem {
  checkpointId: string
  checkpointName: string
  category: string
  checkinTime: Date
  floor: number
  cooldown: {
    isFinished: boolean
    remaining: number | null
  }
}

export { HistoryItem };
