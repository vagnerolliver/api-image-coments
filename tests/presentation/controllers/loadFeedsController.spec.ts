import { FeedModel } from '@/domain/models/feed'
import { LoadFeeds } from '@/domain/usecases/loadFeeds'
import { LoadFeedsController } from '@/presentation/controllers/loadFeedsController'
import { ok, serverError } from '@/presentation/helpers'

const makeFakeFeed = (): FeedModel[] => {
  return [
    {
      id: 'idxx',
      url: 'image1',
      description: 'description1',
      location: 'location1'
    },
    {
      id: 'id2',
      url: 'image2',
      description: 'description2',
      location: 'location2'
    }
  ]
}

const makeLoadFeed = (): LoadFeeds => {
  class LoadFeedStub implements LoadFeeds {
    async load (): Promise<FeedModel[]> {
      return await new Promise(resolve => resolve(makeFakeFeed()))
    }
  }
  return new LoadFeedStub()
}

type SutTypes = {
  sut: LoadFeedsController
  loadsFeedStub: LoadFeeds
}

const makeSut = (): SutTypes => {
  const loadsFeedStub = makeLoadFeed()
  const sut = new LoadFeedsController(loadsFeedStub)
  return {
    sut,
    loadsFeedStub
  }
}

describe('LoadFeedsController', () => {
  test('Should calls LoadFeeds usecase', async () => {
    const { sut, loadsFeedStub } = makeSut()
    const addSpy = jest.spyOn(loadsFeedStub, 'load')
    await sut.handle()
    expect(addSpy).toHaveBeenCalled()
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok(makeFakeFeed()))
  })

  test('Should return 500 if LoadFeeds throws', async () => {
    const { sut, loadsFeedStub } = makeSut()
    jest.spyOn(loadsFeedStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
