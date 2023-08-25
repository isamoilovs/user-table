import { createAsyncThunk } from '@reduxjs/toolkit'

import { IUserModal } from 'components/user-modal/types'

export const addUser = createAsyncThunk(
  'userModal.addUser',
  async (user: IUserModal) => {
    return user
  }
)
