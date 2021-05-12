import { FeedModel } from '@/domain/models/feed'
import { LoadFeeds } from '@/domain/usecases/loadFeeds'
import { LoadFeedController } from '@/presentation/controllers/loadFeedController'
import { ok } from '@/presentation/helpers'

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
  sut: LoadFeedController
  loadFeedStub: LoadFeeds
}

const makeSut = (): SutTypes => {
  const loadFeedStub = makeLoadFeed()
  const sut = new LoadFeedController(loadFeedStub)
  return {
    sut,
    loadFeedStub
  }
}

describe('LoadFeedController', () => {
  test('Should calls LoadFeeds usecase', async () => {
    const { sut, loadFeedStub } = makeSut()
    const addSpy = jest.spyOn(loadFeedStub, 'load')
    await sut.handle()
    expect(addSpy).toHaveBeenCalled()
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok(makeFakeFeed()))
  })
})
