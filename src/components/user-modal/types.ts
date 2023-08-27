import { IDateRange, IUserName } from 'models/randomuser'

export interface IUserModal {
  name: IUserName
  email: string
  phone: string
  cell: string
  dob: IDateRange
}

export interface IUserModalProps {
  visible: boolean
  user: IUserModal
  operation: 'create' | 'update' | 'delete'
  fetching: boolean
  onCancel: () => void
  onSubmit: () => void
}

export interface IUserModalLayoutProps {
  user: IUserModal
  onCancel: () => void
  onSubmit: () => void
}
