import { SaveFeedCommentController } from '@/presentation/controllers/saveFeedCommentController'
import { LoadFeedById } from '@/domain/usecases'
import { HttpRequest } from '@/presentation/protocols'
import { FeedModel } from '@/domain/models'

const makeSaveFeedCommentController = (loadFeedById: LoadFeedById): SaveFeedCommentController => {
  return new SaveFeedCommentController(loadFeedById)
}

const makeFakeRequest = (): HttpRequest => ({
  params: {
    feedId: 'any_feed_id'
  }
})

const makeFakeFeed = (): FeedModel => ({
  id: 'any_id',
  url: 'any_url',
  description: 'any_description',
  location: 'any_location'
})

const makeLoadFeedById = (): LoadFeedById => {
  class LoadFeedByIdStub implements LoadFeedById {
    async loadById (id: string): Promise<FeedModel> {
      return await new Promise(resolve => resolve(makeFakeFeed()))
    }
  }
  return new LoadFeedByIdStub()
}

type SutTypes = {
  sut: SaveFeedCommentController
  loadFeedByIdStub: LoadFeedById
}

const makeSut = (): SutTypes => {
  const loadFeedByIdStub = makeLoadFeedById()
  const sut = makeSaveFeedCommentController(loadFeedByIdStub)
  return {
    loadFeedByIdStub,
    sut
  }
}

describe('SaveFeedCommment Controller', () => {
  test('Should call LoadFeedById with correct values', async () => {
    const { sut, loadFeedByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadFeedByIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_feed_id')
  })
})
