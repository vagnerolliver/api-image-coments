import { AddFeedModel } from '@/domain/usecases/addFeed'
import { AddFeedRepository } from '@/data/protocols/db/addFeedRepository'
import { DbAddFeed } from '@/data/usecases/dbAddFeed'

const makeFakeFeedData = (): AddFeedModel => ({
  url: 'valid_url',
  description: 'valid_description',
  location: 'valid_location'
})

describe('DbAddFeed Usecase', () => {
  test('Should call AddFeedRepository with correct values', async () => {
    class AddFeedRepositoryStub implements AddFeedRepository {
      async add (feedData: AddFeedModel): Promise<void> {
        return await new Promise(resolve => resolve())
      }
    }
    const addFeedRepositoryStub = new AddFeedRepositoryStub()
    const addSpy = jest.spyOn(addFeedRepositoryStub, 'add')
    const sut = new DbAddFeed(addFeedRepositoryStub)
    const feedData = makeFakeFeedData()
    await sut.add(feedData)
    expect(addSpy).toHaveBeenCalledWith(feedData)
  })
})
