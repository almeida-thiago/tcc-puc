import { LoggedUser } from '@models/user'

const initial_state: LoggedUser = {
  permission_id: undefined,
  permission_name: undefined,
  permission_level: undefined,
  person_id: undefined,
  person_name: undefined,
  token: undefined
}

type Action = {
  type: string;
  data?: LoggedUser;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: LoggedUser = initial_state, action: Action): LoggedUser => {
  switch (action.type) {
    case 'ADD_LOGGED_USER':
      return action.data!
    case 'DELETE_LOGGED_USER':
      return initial_state
    default:
      return state
  }
}

export const setLoggedUser = (user: LoggedUser): Action => ({
  type: 'ADD_LOGGED_USER',
  data: user
})

export const clearLoggedUser = (): Action => ({
  type: 'DELETE_LOGGED_USER'
})
