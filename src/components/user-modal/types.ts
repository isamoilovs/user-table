export interface IUserModal {
  name: string
  email: string
  phone: string
  cell: string
  dob: Date
}

export interface IUserModalProps {
  visible: boolean
  user: IUserModal
}
