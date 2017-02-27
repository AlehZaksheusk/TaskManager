export const REGISTER_INPUT_TYPES = [
  {
    type: 'email',
    componentClass: 'input',
    placeholder: 'Enter email',
  },
  {
    type: 'name',
    componentClass: 'input',
    placeholder: 'Enter name',
  },
  {
    type: 'password1',
    componentClass: 'input',
    placeholder: 'Enter password',
  },
  {
    type: 'password2',
    componentClass: 'input',
    placeholder: 'Confirm password',
  },
];

export const LOGIN_INPUT_TYPES = [
  {
    type: 'email',
    componentClass: 'input',
    placeholder: 'Enter email',
  },
  {
    type: 'password',
    extraType: 'password',
    componentClass: 'input',
    placeholder: 'Enter password',
  },
];

export const USER_SETTINGS_INPUT_TYPES = [
  {
    type: 'email',
    componentClass: 'input',
    placeholder: 'Enter email',
  },
  {
    type: 'name',
    componentClass: 'input',
    placeholder: 'Enter name',
  },
];

export const CREATE_ISSUE_INPUT_TYPES = [
  {
    type: 'name',
    componentClass: 'input',
    placeholder: 'Enter name',
  },
  {
    type: 'description',
    componentClass: 'textarea',
    placeholder: 'Enter description',
  },
];

export const CREATE_PROJECT_INPUT_TYPES = [
  {
    type: 'name',
    componentClass: 'input',
    placeholder: 'Enter name',
  },
];

export const REGISTRATION_KEYS = ['email', 'name', 'password1', 'password2', 'position'];
export const USER_POSITION_CHOICES = [
  {
    label: 'Developer',
    value: false,
  },
  {
    label: 'Manager',
    value: true,
  },
];
