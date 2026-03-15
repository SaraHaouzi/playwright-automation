export const UsersValid = [
  'problem_user',
  'performance_glitch_user',
  'error_user',
  'visual_user',
]
export const UsersNotValid = [
  {
    username: 'standard_user',
    password: 'secret',
    errorMessage:
      'Epic sadface: Username and password do not match any user in this service',
  },
  {
    username: 'user',
    password: 'secret_sauce',
    errorMessage:
      'Epic sadface: Username and password do not match any user in this service',
  },
  {
    username: 'user',
    password: 'secret',
    errorMessage:
      'Epic sadface: Username and password do not match any user in this service',
  },
  {
    username: '',
    password: 'secret_sauce',
    errorMessage: 'Epic sadface: Username is required',
  },
  {
    username: 'standard_user',
    password: '',
    errorMessage: 'Epic sadface: Password is required',
  },
  {
    username: '',
    password: '',
    errorMessage: 'Epic sadface: Username is required',
  },
]
export const checkoutUser = {
  firstName: 'sara',
  lastName: 'hauzi',
  postalCode: '1234',
}
