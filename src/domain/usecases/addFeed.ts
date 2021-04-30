export interface AddFeedModel {
  url: string
  description?: string
  location?: string
}

export interface AddFeed {
  add: (feed: AddFeedModel) => Promise<void>
}
