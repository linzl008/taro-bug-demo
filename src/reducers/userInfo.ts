import { SET_USERINFO } from '../constants/common'

const INITIAL_STATE = {
  accountName: '',
  payload: {}
}
export type UserInfo ={
  accountName: string,
  payload: object
}
export type UserAction = {
  // @ts-ignore
  type: SET_USERINFO,
  data: UserInfo
}

export default function userInfo (state = INITIAL_STATE, action:UserAction) {
  switch (action.type) {
    case SET_USERINFO:
      return {
        ...state,
        ...action.data
      }
     default:
       return state
  }
}

