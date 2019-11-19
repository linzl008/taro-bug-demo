import {
  SET_USERINFO,
} from '../constants/common'

export const setUserInfo = (data) => {
  return {
    type: SET_USERINFO,
    data: data
  }
}

