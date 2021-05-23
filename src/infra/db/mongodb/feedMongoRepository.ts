import { MongoHelper } from '@/infra/db/mongodb'
import { AddFeedRepository, LoadFeedsRepository, LoadFeedByIdRepository } from '@/data/protocols/db'
import { AddFeed } from '@/domain/usecases'
import { FeedModel } from '@/domain/models'

export class FeedMongoRepository implements AddFeedRepository, LoadFeedsRepository, LoadFeedByIdRepository {
  async add (feedData: AddFeed.Params): Promise<void> {
    const feedCollection = await MongoHelper.getCollection('feeds')
    await feedCollection.insertOne(feedData)
  }

  async loadAll (): Promise<FeedModel[]> {
    const feedCollection = await MongoHelper.getCollection('feeds')
    const feeds: FeedModel[] = await feedCollection.find().toArray()
    return feeds
  }

  async loadById (id: string): Promise<FeedModel> {
    const feedCollection = await MongoHelper.getCollection('feeds')
    const feed: FeedModel = await feedCollection.findOne({ _id: id })
    return feed
  }
}
