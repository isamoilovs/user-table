import { createAction } from '@reduxjs/toolkit'

import { IUser } from '../../models'

export const setUsers = createAction<IUser[]>('users.setReady')
export const createUser = createAction<IUser>('users.createUser')
export const updateUser = createAction<IUser>('users.updateUser')
export const deleteUser = createAction<IUser>('users.deleteUser')
