import { createAction } from '@reduxjs/toolkit'

export const open = createAction('userModal.open')
export const hide = createAction('userModal.hide')
export const setUser = createAction('userModal.setUser')
