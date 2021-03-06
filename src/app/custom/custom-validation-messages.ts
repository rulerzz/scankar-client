
export class CustomValidationMessages {
  private static _validationMessages = {
    name: {
      required: 'Name is required',
      minlength: 'Name must be greater than 4 characters',
      maxlength: 'Name must be less than 20 characters',
      startSpace: 'Name can not start with space'
    },
    branch: {
      required: 'Branch name is required',
      minlength: 'Branch name must be greater than 4 characters',
      maxlength: 'Branch name must be less than 20 characters',
      startSpace: 'Branch name can not start with space'
    },
    branchName: {
      required: 'Branch name is required',
      minlength: 'Branch name must be greater than 4 characters',
      maxlength: 'Branch name must be less than 20 characters',
      startSpace: 'Branch name can not start with space'
    },
    category: {
      required: 'Category is required',
      minlength: 'Category must be greater than 4 characters',
      maxlength: 'Category must be less than 20 characters',
      startSpace: 'Category can not start with space'
    },
    contactName: {
      required: 'Contact name is required',
      minlength: 'Contact name must be greater than 4 characters',
      maxlength: 'Contact name must be less than 20 characters',
      startSpace: 'Contact name can not start with space'
    },
    userName: {
      required: 'Username is required',
      invalid: 'Email is invalid',
      startSpace: 'Email can not start with space',
      minlength: 'Phone number must be equal to 10 digits',
      digits: 'Only digits allowed',
      length: 'Phone number must be only 10 digits long'
    },
    email: {
      required: 'Email is required',
      invalid: 'Email is invalid',
      startSpace: 'Email can not start with space',
    },
    phone: {
      required: 'Phone number is required',
      minlength: 'Phone number must be equal to 10 digits',
      digits: 'Only digits allowed',
      length: 'Phone number must be only 10 digits long'
    },
    contact: {
      required: 'Phone number is required',
      minlength: 'Phone number must be equal to 10 digits',
      digits: 'Only digits allowed',
      length: 'Phone number must be only 10 digits long'
    },
    price: {
      required: 'Price is required',
      minlength: 'Price must be equal to 10 digits',
      digits: 'Only digits allowed',
      length: 'Price must be only 10 digits long'
    },
    contactNumber: {
      required: 'Phone number is required',
      minlength: 'Phone number must be equal to 10 digits',
      digits: 'Only digits allowed',
      length: 'Phone number must be only 10 digits long'
    },
    oldPassword: {
      required: 'Password is required',
      minlength: 'Password must be greater than or equal to 6 characters',
      maxlength: 'Password must be less than 20 characters',
      startSpace: 'Password can not start with space'
    },
    password: {
      required: 'Password is required',
      minlength: 'Password must be greater than or equal to 6 characters',
      maxlength: 'Password must be less than 20 characters',
      startSpace: 'Password can not start with space'
    },
    passwordGroup: {
      passwordMismatch: 'Password and Confirm Password do not match'
    },
    confirmPassword: {
      required: 'Confirm password is required',
    },
    otp: {
      required: 'OTP is required',
    },
    address: {
      required: 'Address is required',
      minlength: 'Address must be greater than 6 characters',
      maxlength: 'Address must be less than 20 characters',
      startSpace: 'Address can not start with space'
    },
    type: {
      required: 'Type is required',
      minlength: 'Type must be greater than 6 characters',
      maxlength: 'Type must be less than 20 characters',
      startSpace: 'Type can not start with space'
    },
    item: {
      required: 'Item name is required',
      minlength: 'Item name must be greater than 6 characters',
      maxlength: 'Item name must be less than 20 characters',
      startSpace: 'Item name can not start with space'
    },
    start_date: {
      required: 'Start date is required',
    },
    end_date: {
      required: 'End date is required',
    },
    shortDescription: {
      required: 'Short description is required',
    },
    userType: {
      required: 'User type is required',
    },
    locality: {
      required: 'Locality is required',
    },
    landmark: {
      required: 'Locality is required',
      startSpace: 'Can not start with space'
    },
    city: {
      required: 'City is required',
    },
    state: {
      required: 'State is required',
    },
    country: {
      required: 'Country is required',
    },
    pincode: {
      required: 'Pincode is required',
      minlength: 'Pincode must be equal to 6 digits',
      digits: 'Only digits allowed',
      length: 'Pincode must be only 6 digits long'
    },
    restaurantName: {
      required: 'Restaurant name is required',
      minlength: 'Restaurant name must be greater than 6 characters',
      maxlength: 'Restaurant name must be less than 20 characters',
      startSpace: 'Restaurant name can not start with space'
    },
    apiKey: {
      required: 'API Key is required',
      startSpace: 'API Key can not start with space'
    },
  };

  static get validationMessages() {
    return this._validationMessages;
  }
}
