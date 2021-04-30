import { MongoHelper } from '@/infra/db/mongodb/mongoHelper'
import { AddFeedRepository } from '@/data/protocols/db/addFeedRepository'
import { AddFeedModel } from '@/domain/usecases/addFeed'

export class FeedMongoRepository implements AddFeedRepository {
  async add (feedData: AddFeedModel): Promise<void> {
    const feedCollection = await MongoHelper.getCollection('feed')
    await feedCollection.insertOne(feedData)
  }
}
