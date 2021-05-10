import { FeedModel } from '@/domain/models/feed'
import { LoadFeed } from '@/domain/usecases/loadFeed'
import { LoadFeedController } from '@/presentation/controllers/loadFeedController'

class LoadFeedSpy implements LoadFeed {
  async load (): Promise<FeedModel> {
    return null
  }
}

type SutTypes = {
  sut: LoadFeedController
  loadFeedSpy: LoadFeed
}

const makeSut = (): SutTypes => {
  const loadFeedSpy = new LoadFeedSpy()
  const sut = new LoadFeedController(loadFeedSpy)
  return {
    sut,
    loadFeedSpy
  }
}

describe('LoadFeedController', () => {
  test('Should calls LoadFeed usecase', async () => {
    const { sut, loadFeedSpy } = makeSut()
    const addSpy = jest.spyOn(loadFeedSpy, 'load')
    await sut.handle()
    expect(addSpy).toHaveBeenCalled()
  })
})
