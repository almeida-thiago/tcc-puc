import { Alert } from '@models/messages'

const initial_state: Alert | null = null

type Action = {
  type: string;
  data: Alert | null;
}

const action = (state: Alert | null = initial_state, action: Action): Alert  | null => {
  switch (action.type) {
    case 'ADD_ALERT':
      return action.data
    case 'CLEAR_ALERT':
      return null
    default:
      return state
  }
}

/**
 * set alert to redux store
 * @param {Alert} alertObject alert object
 */
const addAlert = (alert: Alert): Action => ({
  type: 'ADD_ALERT',
  data: alert
})

/** remove alert to redux store */
const clearAlert = (): Action => ({
  type: 'CLEAR_ALERT',
  data: null
})

export {
  addAlert,
  clearAlert
}

export default action
