import { IDateRange, IUserName } from '../../models/randomuser'

export interface IUserModal {
  name: IUserName
  email: string
  phone: string
  cell: string
  dob: IDateRange
}

export interface IUserModalState {
  visible: boolean
  user: IUserModal
  operation: 'create' | 'update' | 'delete'
  fetching: boolean
  confirmLoading: boolean
}
