import { FeedModel } from '@/domain/models/feed'
import { LoadFeedsRepository } from '@/data/protocols/db'
import { DbLoadFeeds } from '@/data/usecases/dbLoadFeeds'

const makeFakeFeeds = (): FeedModel[] => {
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
type SutTypes = {
  sut: DbLoadFeeds
  loadSurveysRepositoryStub: LoadFeedsRepository
}

const makeLoadFeedRepository = (): LoadFeedsRepository => {
  class LoadSurveysRepositoryStub implements LoadFeedsRepository {
    async loadAll (): Promise<FeedModel[]> {
      return await new Promise(resolve => resolve(makeFakeFeeds()))
    }
  }
  return new LoadSurveysRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = makeLoadFeedRepository()
  const sut = new DbLoadFeeds(loadSurveysRepositoryStub)
  return {
    sut,
    loadSurveysRepositoryStub
  }
}

describe('DbLoadFeeds', () => {
  test('Should call LoadFeedsRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    await sut.load()
    expect(addSpy).toHaveBeenCalled()
  })

  test('Should return a list of Feeds on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.load()
    expect(surveys).toEqual(makeFakeFeeds())
  })

  test('Should throw if LoadFeedsRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
