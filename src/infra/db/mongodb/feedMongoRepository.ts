import { MongoHelper } from '@/infra/db/mongodb/mongoHelper'
import { AddFeedRepository, LoadFeedsRepository } from '@/data/protocols/db'
import { AddFeed } from '@/domain/usecases'
import { FeedModel } from '@/domain/models/feed'

export class FeedMongoRepository implements AddFeedRepository, LoadFeedsRepository {
  async add (feedData: AddFeed.Params): Promise<void> {
    const feedCollection = await MongoHelper.getCollection('feeds')
    await feedCollection.insertOne(feedData)
  }

  async loadAll (): Promise<FeedModel[]> {
    const feedCollection = await MongoHelper.getCollection('feeds')
    const feeds: FeedModel[] = await feedCollection.find().toArray()
    return feeds
  }
}
