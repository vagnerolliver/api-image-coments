import request from 'supertest'
import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/mongoHelper'
import { Collection } from 'mongodb'

let feedCollection: Collection

describe('Feed Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    feedCollection = await MongoHelper.getCollection('surveys')
    await feedCollection.deleteMany({})
  })

  describe('POST /feed', () => {
    test('Should return 204 on add feed success', async () => {
      await request(app)
        .post('/api/feed')
        .send({
          url: 'valid_url',
          description: 'valid_description',
          location: 'valid_location'
        })
        .expect(204)
    })
  })

  describe('GET /feeds', () => {
    test('Should return 200 and load all feeds', async () => {
      await feedCollection.insertMany([{
        url: 'any_url',
        description: 'any_description',
        location: 'any_location'
      }])

      await request(app)
        .get('/api/feeds')
        .expect(200)
    })
  })
})
