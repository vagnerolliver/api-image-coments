import request from 'supertest'
import app from '@/main/config/app'

describe('Feed Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/feed')
      .send({
        url: 'valid_url',
        description: 'valid_description',
        location: 'valid_location'
      })
      .expect(200)
  })
})
