import { MongoHelper } from '@/infra/db/mongodb'
import { SaveFeedCommentModel } from '@/domain/usecases'
import { FeedCommentModel } from '@/domain/models/feedComment'
import { SaveFeedCommentRepository } from '@/data/protocols/db/saveFeedCommentRepository'

export class FeedCommentRepository implements SaveFeedCommentRepository {
  async save (data: SaveFeedCommentModel): Promise<FeedCommentModel> {
    const feedCommentCollection = await MongoHelper.getCollection('feedComment')

    const res = await feedCommentCollection.findOneAndUpdate({
      surveyId: data.feedId
    }, {
      $set: {
        message: data.message,
        date: data.date
      }
    }, {
      upsert: true,
      returnOriginal: false
    })
    return res.value && MongoHelper.map(res.value)
  }
}
