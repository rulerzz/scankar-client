
export class AdvanceConfigValidationMessages {
  private static _validationMessages = {
    projectID: {
      required: 'Project ID is required',
      digits: 'Only digits allowed.',
    },
  };

  static get validationMessages() {
      return this._validationMessages;
  }
}
