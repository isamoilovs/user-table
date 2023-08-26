import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { IUser } from '../../models'

export interface IUsersTableProps {
  loading?: boolean
  users: IUser[]
  editUser: (user: IUser) => { payload: any; type: string }
  deleteUser: (user: IUser) => { payload: any; type: string }
}
