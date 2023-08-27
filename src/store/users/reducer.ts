import { createReducer } from '@reduxjs/toolkit'

import { IUsersState } from './types'

import { generate } from './thunks'
import { createUser, deleteUser, updateUser } from './actions'

const initialState: IUsersState = {
  fetching: false,
  users: []
}

export const usersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createUser, (state, { payload }) => {
      return {
        ...state,
        users: [payload, ...state.users]
      }
    })
    .addCase(updateUser, (state, { payload }) => {
      const editUserIndex = state.users.findIndex(
        (user) => user.login.uuid === payload.login.uuid
      )
      let editUser = state.users[editUserIndex]
      editUser = { ...payload }

      return {
        ...state,
        users: [
          ...state.users.slice(0, editUserIndex),
          editUser,
          ...state.users.slice(editUserIndex + 1)
        ]
      }
    })
    .addCase(deleteUser, (state, { payload }) => {
      let usersTmp = [...state.users]
      const deletedUserIndex = usersTmp.findIndex(
        (user) => user.login.uuid === payload.login.uuid
      )
      usersTmp.splice(deletedUserIndex, 1)
      return { ...state, users: [...usersTmp] }
    })
    .addCase(generate.pending, (state) => ({ ...state, fetching: true }))
    .addCase(generate.fulfilled, (state, { payload }) => ({
      ...state,
      fetching: false,
      users: [...payload]
    }))
    .addCase(generate.rejected, (state) => ({
      ...state,
      fetching: false,
      users: []
    }))
})
    
