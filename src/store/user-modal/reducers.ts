import { createReducer, createSlice } from '@reduxjs/toolkit'
import { IUserModalState } from './types'
import { createUserModal } from './thunks'
import { deleteUser, dismissModal, editUser, setUser } from './actions'
let userEmptyJSON = require('../../data/random-user-empty.json')

const initialState: IUserModalState = {
  visible: false,
  fetching: false,
  user: {
    ...userEmptyJSON
  },
  operation: 'create',
  confirmLoading: false
}

export const userModalReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(dismissModal, (state) => ({
      ...state,
      user: { ...initialState.user },
      visible: false
    }))
    .addCase(editUser, (state, { payload }) => ({
      ...state,
      user: { ...payload },
      operation: 'update',
      visible: true
    }))
    .addCase(deleteUser, (state, { payload }) => ({
      ...state,
      operation: 'delete',
      visible: true,
      user: { ...payload }
    }))
    .addCase(setUser, (state, { payload }) => ({
      ...state,
      user: { ...payload }
    }))
    .addCase(createUserModal.pending, (state) => ({
      ...state,
      fetching: true,
      operation: 'create',
      visible: false
    }))
    .addCase(createUserModal.fulfilled, (state, { payload }) => ({
      ...state,
      visible: true,
      fetching: false,
      user: { ...payload }
    }))
    .addCase(createUserModal.rejected, (state) => ({
      ...state,
      visible: false,
      fetching: false,
      user: initialState.user
    }))
})
