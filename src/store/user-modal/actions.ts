import { createAction } from '@reduxjs/toolkit'
import { IUser } from 'models'

export const dismissModal = createAction('userModal.dismissModal')
export const editUser = createAction<IUser>('userModal.editUser')
export const deleteUser = createAction<IUser>('userModal.deleteUser')
