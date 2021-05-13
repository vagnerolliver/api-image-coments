import { AddFeed } from '@/domain/usecases/addFeed'
import { AddFeedRepository } from '@/data/protocols/db'
import { DbAddFeed } from '@/data/usecases'

const makeFakeFeedData = (): AddFeed.Params => ({
  url: 'valid_url',
  description: 'valid_description',
  location: 'valid_location'
})

const makeAddFeedRepository = (): AddFeedRepository => {
  class AddFeedRepositoryStub implements AddFeedRepository {
    async add (feedData: AddFeed.Params): Promise<void> {
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

  test('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addFeedRepositoryStub } = makeSut()
    jest.spyOn(addFeedRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeFeedData())
    await expect(promise).rejects.toThrow()
  })
})
