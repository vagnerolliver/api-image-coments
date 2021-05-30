import { MongoHelper, FeedCommentRepository } from '@/infra/db/mongodb'
import { Collection } from 'mongodb'
import { FeedModel } from '@/domain/models'

let feedCollection: Collection
let feedCommentCollection: Collection

const makeFakeFeed = async (): Promise<FeedModel> => {
  const res = await feedCollection.insertOne({
    url: 'valid_url',
    description: 'valid_description',
    location: 'valid_location'
  })
  return res.ops[0]
}

const makeSut = (): FeedCommentRepository => {
  return new FeedCommentRepository()
}

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    feedCollection = await MongoHelper.getCollection('feeds')
    await feedCollection.deleteMany({})

    feedCommentCollection = await MongoHelper.getCollection('feedComment')
    await feedCommentCollection.deleteMany({})
  })

  describe('save()', () => {
    test('Should add a feed comment if its new', async () => {
      const feed = await makeFakeFeed()
      const sut = makeSut()
      const feedComment = await sut.save({
        feedId: feed.id,
        message: 'mensagem',
        date: new Date()
      })
      expect(feedComment).toBeTruthy()
      expect(feedComment.id).toBeTruthy()
    })

    test('Should update a feed coment if its not new', async () => {
      const feed = await makeFakeFeed()
      const res = await feedCommentCollection.insertOne({
        feedId: feed.id,
        message: 'any_message',
        date: new Date()
      })
      const sut = makeSut()
      const feedComment = await sut.save({
        feedId: feed.id,
        message: 'other_message',
        date: new Date()
      })
      expect(feedComment).toBeTruthy()
      expect(feedComment.id).toEqual(res.ops[0]._id)
      expect(feedComment.message).toBe('other_message')
    })
  })
})
