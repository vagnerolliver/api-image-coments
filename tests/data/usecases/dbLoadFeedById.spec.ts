import { DbLoadFeedById } from '@/data/usecases/dbLoadFeedById';
import { LoadFeedByIdRepository } from '@/data/protocols/db/loadFeedById'

import { FeedModel } from '@/domain/models/feed'

const makeFakeFeed = (): FeedModel => {
  return {
    id: 'any_id',
    url: 'any_url',
    description: 'any_description',
    location: 'any_location'
  }
}

const makeLoadFeedByIdRepository = (): LoadFeedByIdRepository => {
  class LoadFeedByIdRepositoryStub implements LoadFeedByIdRepository {
    async loadById (id: string): Promise<FeedModel> {
      return await new Promise(resolve => resolve(makeFakeFeed()))
    }
  }
  return new LoadFeedByIdRepositoryStub()
}

type SutTypes = {
  sut: DbLoadFeedById
  loadFeedByIdRepositoryStub: LoadFeedByIdRepository
}

const makeSut = (): SutTypes => {
  const loadFeedByIdRepositoryStub = makeLoadFeedByIdRepository()
  const sut = new DbLoadFeedById(loadFeedByIdRepositoryStub)

  return {
    sut,
    loadFeedByIdRepositoryStub
  }
}

describe('DbLoadFeedById', () => {
  test('Should call LoadFeedByIdRepository', async () => {
    const { sut, loadFeedByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadFeedByIdRepositoryStub, 'loadById')
    await sut.loadById('any_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return Feed on success', async () => {
    const { sut } = makeSut()
    const survey = await sut.loadById('any_id')
    expect(survey).toEqual(makeFakeFeed())
  })

  test('Should throw if LoadFeedByIdRepository throws', async () => {
    const { sut, loadFeedByIdRepositoryStub } = makeSut()
    jest.spyOn(loadFeedByIdRepositoryStub, 'loadById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.loadById('any_id')
    await expect(promise).rejects.toThrow()
  })
})
