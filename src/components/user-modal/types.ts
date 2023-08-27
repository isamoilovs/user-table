import { IDateRange, IUser, IUserName } from 'models/randomuser'

export interface IUserModalProps {
  visible: boolean
  user: IUser
  operation: 'create' | 'update' | 'delete'
  fetching: boolean
  onCancel: () => void
  onSubmit: (user: IUser) => void
}

export interface IUserModalLayoutProps {
  user: IUser
  onCancel: () => void
  onSubmit: (user: IUser) => void
}

export interface IUserModalState {
  visible: boolean
  user: IUser
  operation: 'create' | 'update' | 'delete'
  fetching: boolean
  confirmLoading: boolean
}
