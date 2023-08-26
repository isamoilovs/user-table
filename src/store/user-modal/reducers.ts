import { createReducer, createSlice } from '@reduxjs/toolkit'
import { IUserModalState } from './types'
import { createUser, confirmCreateUser } from './thunks'

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

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    dismissModal: (state = initialState) => {
      return { ...state, visible: false, user: { ...initialState.user } }
    },
    editUser: (state = initialState, { payload }) => {
      return {
        ...state,
        user: { ...payload },
        operation: 'update',
        visible: true
      }
    },
    deleteUser: (state = initialState, { payload }) => {
      return {
        ...state,
        operation: 'delete',
        visible: true,
        user: { ...payload }
      }
    }
  },
  extraReducers: (builder) => {
    builder
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
    // .addCase(confirmCreateUser.pending, (state) => {})
    // .addCase(confirmCreateUser.fulfilled, (state, { payload }) => {
    //   console.log(payload)
    // })
    // .addCase(confirmCreateUser.rejected, (state, { payload }) => {
    //   console.log(payload)
    // })
  }
})

export const { dismissModal, editUser, deleteUser } = modalSlice.actions
