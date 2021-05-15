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
    feedCollection = await MongoHelper.getCollection('feeds')
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

  describe('loadAll()', () => {
    test('Should load all surveys on success', async () => {
      await feedCollection.insertMany([{
        url: 'any_url',
        description: 'any_description',
        location: 'any_location'
      }, {
        url: 'other_url',
        description: 'other_description',
        location: 'other_location'
      }])

      const sut = makeSut()
      const feeds = await sut.loadAll()
      expect(feeds.length).toBe(2)
      expect(feeds[0].url).toBe('any_url')
      expect(feeds[1].url).toBe('other_url')
    })
  })
})
