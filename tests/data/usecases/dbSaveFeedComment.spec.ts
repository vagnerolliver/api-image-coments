import { FeedCommentModel } from '@/domain/models'
import { SaveFeedCommentModel } from '@/domain/usecases'
import MockDate from 'mockdate'
import { SaveFeedCommentRepository } from '@/data/protocols/db'
import { DbSaveFeedComment } from '@/data/usecases'

const makeFakeFeedComment = (): FeedCommentModel => {
  return {
    id: 'any_id',
    feedId: 'any_feedId',
    message: 'any_message',
    date: new Date()
  }
}

const makeSaveFeedCommentStub = (): SaveFeedCommentRepository => {
  class SaveFeedCommentStub implements SaveFeedCommentRepository {
    async save (data: SaveFeedCommentModel): Promise<FeedCommentModel> {
      return new Promise(resolve => resolve(makeFakeFeedComment()))
    }
  }
  return new SaveFeedCommentStub()
}

type SutTypes = {
  sut: DbSaveFeedComment
  saveFeedCommentRepositoryStub: SaveFeedCommentRepository
}

const makeSut = (): SutTypes => {
  const saveFeedCommentRepositoryStub = makeSaveFeedCommentStub()
  const sut = new DbSaveFeedComment(saveFeedCommentRepositoryStub)

  return {
    sut,
    saveFeedCommentRepositoryStub
  }
}

describe('DbSaveFeedComment Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call SaveFeedCommentRepository with correct values', async () => {
    const { sut, saveFeedCommentRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveFeedCommentRepositoryStub, 'save')
    const feeddCommentData = makeFakeFeedComment()
    await sut.save(feeddCommentData)
    expect(saveSpy).toHaveBeenCalledWith(feeddCommentData)
  })

  test('Should return FeedComment on success', async () => {
    const { sut } = makeSut()
    const feedComment = await sut.save(makeFakeFeedComment())
    expect(feedComment).toEqual(makeFakeFeedComment())
  })

  test('Should throw if SaveFeedCommentRepository throws', async () => {
    const { sut, saveFeedCommentRepositoryStub } = makeSut()
    jest.spyOn(saveFeedCommentRepositoryStub, 'save').mockRejectedValueOnce(new Error())
    const promise = sut.save(makeFakeFeedComment())
    await expect(promise).rejects.toThrow()
  })
})
