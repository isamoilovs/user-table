import { createAsyncThunk } from '@reduxjs/toolkit'
import { randomuser } from '../../utils'

export const createUserModal = createAsyncThunk(
  'userModal.createUser',
  async () => {
    const randomUser = await randomuser(1)
    return randomUser[0]
  }
)



