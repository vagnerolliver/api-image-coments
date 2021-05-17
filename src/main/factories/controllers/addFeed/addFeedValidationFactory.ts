
import { ValidationComposite } from '@/validation/validators/validationComposite'
import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation } from '@/validation/validators/requiredFieldValidation'

export const makeAddFeedValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['url']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
