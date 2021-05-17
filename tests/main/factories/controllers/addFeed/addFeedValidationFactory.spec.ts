import { makeAddFeedController } from '@/main/factories/controllers/addFeed/addFeedControllerFactory'
import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation } from '@/validation/validators/requiredFieldValidation'
import { ValidationComposite } from '@/validation/validators/validationComposite'

jest.mock('@/validation/validators/validationComposite')

describe('AddSurveyValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddFeedController()
    const validations: Validation[] = []
    for (const field of ['url']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
