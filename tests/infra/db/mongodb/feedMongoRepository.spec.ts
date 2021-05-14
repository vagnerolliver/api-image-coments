import { FeedMongoRepository } from '@/infra/db/mongodb/feedMongoRepository'
import { MongoHelper } from '@/infra/db/mongodb/mongoHelper'
import { Collection } from 'mongodb'

let feedCollection: Collection

const makeSut = (): FeedMongoRepository => {
  return new FeedMongoRepository()
}

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    feedCollection = await MongoHelper.getCollection('feed')
    await feedCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should add a feed on success', async () => {
      const sut = makeSut()
      await sut.add({
        url: 'valid_url',
        description: 'valid_description',
        location: 'valid_location'
      })
      const feed = await feedCollection.findOne({ url: 'valid_url' })
      expect(feed).toBeTruthy()
    })
  })
})
