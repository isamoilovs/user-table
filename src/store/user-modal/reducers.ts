import { createReducer, createSlice } from '@reduxjs/toolkit'
import { IUserModalState } from './types'
import { createUser } from './thunks'
import { deleteUser, dismissModal, editUser } from './actions'

const initialState: IUserModalState = {
  visible: false,
  fetching: false,
  user: {
    name: { title: '', first: '', last: '' },
    email: '',
    cell: '',
    phone: '',
    dob: { age: 0, date: '' }
  },
  operation: 'create',
  confirmLoading: false
}

export const userModalReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(dismissModal, (state) => ({
      ...state,
      visible: false,
      user: { ...initialState.user }
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
    .addCase(createUser.pending, (state) => {
      return { ...state, fetching: true, operation: 'create', visible: false }
    })
    .addCase(createUser.fulfilled, (state, { payload }) => {
      console.log('userModalReducer present state: ', payload)
      return {
        ...state,
        visible: true,
        fetching: false,
        user: { ...payload }
      }
    })
    .addCase(createUser.rejected, (state, { payload }) => {
      console.log('userModalReducer present state: ', payload)
      return {
        ...state,
        visible: false,
        fetching: false,
        user: initialState.user
      }
    })
})
