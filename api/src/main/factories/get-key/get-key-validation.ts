import { RequiredFieldValidation } from "../../../presentation/helpers/validators/required-field-validation/required-field-validation";
import { ValidationComposite } from "../../../presentation/helpers/validators/validation-composite";
import type { Validation } from "../../../presentation/protocols/validation";

export const makeGetKeyValidation = () => {
  const validations: Array<Validation> = [];

  return new ValidationComposite(validations);
};
