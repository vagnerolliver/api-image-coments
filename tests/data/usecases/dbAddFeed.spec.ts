import { AddFeedModel } from '@/domain/usecases/addFeed'
import { AddFeedRepository } from '@/data/protocols/db/addFeedRepository'
import { DbAddFeed } from '@/data/usecases/dbAddFeed'

const makeFakeFeedData = (): AddFeedModel => ({
  url: 'valid_url',
  description: 'valid_description',
  location: 'valid_location'
})

const makeAddFeedRepository = (): AddFeedRepository => {
  class AddFeedRepositoryStub implements AddFeedRepository {
    async add (feedData: AddFeedModel): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new AddFeedRepositoryStub()
}

type SutTypes = {
  sut: DbAddFeed
  addFeedRepositoryStub: AddFeedRepository
}

const makeSut = (): SutTypes => {
  const addFeedRepositoryStub = makeAddFeedRepository()
  const sut = new DbAddFeed(addFeedRepositoryStub)

  return {
    sut,
    addFeedRepositoryStub
  }
}

describe('DbAddFeed Usecase', () => {
  test('Should call AddFeedRepository with correct values', async () => {
    const { sut, addFeedRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addFeedRepositoryStub, 'add')
    const feedData = makeFakeFeedData()
    await sut.add(feedData)
    expect(addSpy).toHaveBeenCalledWith(feedData)
  })
})
