import { IUser } from '../../models/randomuser'

export interface IUserModalState {
  visible: boolean
  user: IUser
  operation: 'create' | 'update' | 'delete'
  fetching: boolean
  confirmLoading: boolean
}
