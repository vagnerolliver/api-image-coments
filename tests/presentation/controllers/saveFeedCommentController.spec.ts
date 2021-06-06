import { forbidden, serverError, missing } from '@/presentation/helpers/httpHelper'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { SaveFeedCommentController } from '@/presentation/controllers/saveFeedCommentController'
import { LoadFeedById, SaveFeedComment, SaveFeedCommentModel } from '@/domain/usecases'
import { HttpRequest } from '@/presentation/protocols'
import { FeedModel, FeedCommentModel } from '@/domain/models'
import MockDate from 'mockdate'

const makeSaveFeedCommentController = (loadFeedById: LoadFeedById, saveFeedComment: SaveFeedComment): SaveFeedCommentController => {
  return new SaveFeedCommentController(loadFeedById, saveFeedComment)
}

const makeFakeRequest = (): HttpRequest => ({
  params: {
    feedId: 'any_feed_id'
  },
  body: {
    message: 'any_message'
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

const makeFakeFeedComment = (): FeedCommentModel => ({
  id: 'valid_id',
  feedId: 'valid_feed_id',
  date: new Date(),
  message: 'valid_message'
})

const makeSaveFeedComment = (): SaveFeedComment => {
  class SaveFeedCommentStub implements SaveFeedComment {
    async save (data: SaveFeedCommentModel): Promise<FeedCommentModel> {
      return new Promise(resolve => resolve(makeFakeFeedComment()))
    }
  }
  return new SaveFeedCommentStub()
}

type SutTypes = {
  sut: SaveFeedCommentController
  loadFeedByIdStub: LoadFeedById
  saveFeedCommentStub: SaveFeedComment
}

const makeSut = (): SutTypes => {
  const loadFeedByIdStub = makeLoadFeedById()
  const saveFeedCommentStub = makeSaveFeedComment()
  const sut = makeSaveFeedCommentController(loadFeedByIdStub, saveFeedCommentStub)
  return {
    loadFeedByIdStub,
    saveFeedCommentStub,
    sut
  }
}

describe('SaveFeedCommment Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadFeedById with correct values', async () => {
    const { sut, loadFeedByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadFeedByIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_feed_id')
  })

  test('Should return 403 if LoadFeedById returns null', async () => {
    const { sut, loadFeedByIdStub } = makeSut()
    // jest.spyOn(loadFeedByIdStub, 'loadById').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    jest.spyOn(loadFeedByIdStub, 'loadById').mockResolvedValueOnce(null)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('feedId')))
  })

  test('Should return 500 if LoadFeedById throws', async () => {
    const { sut, loadFeedByIdStub } = makeSut()
    jest.spyOn(loadFeedByIdStub, 'loadById').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 403 if an invalid message is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      params: {
        feedId: 'any_feed_id'
      },
      body: {
        message: null
      }
    })
    expect(httpResponse).toEqual(missing(new MissingParamError('message')))
  })

  test('Should call SaveFeedComment with correct values', async () => {
    const { sut, saveFeedCommentStub } = makeSut()
    const saveSpy = jest.spyOn(saveFeedCommentStub, 'save')
    await sut.handle(makeFakeRequest())
    expect(saveSpy).toHaveBeenCalledWith({
      feedId: 'any_feed_id',
      message: 'any_message',
      date: new Date()
    })
  })
})
