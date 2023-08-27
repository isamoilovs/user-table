import { createAsyncThunk } from '@reduxjs/toolkit'
import { randomuser } from '../../utils'

export const createUser = createAsyncThunk(
  'userModal.createUser',
  async (_: void, { dispatch }) => {
    const randomUser = await randomuser(1)
    return randomUser[0]
  }
)



