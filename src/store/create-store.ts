import { configureStore } from '@reduxjs/toolkit'

import { applicationReducer } from './application/reducer'
import { usersReducer } from './users/reducer'
import { userModalReducer } from './user-modal/reducers'

export const createStore = () =>
  configureStore({
    reducer: {
      application: applicationReducer,
      users: usersReducer,
      userModal: userModalReducer
    }
  })
