import { Button, Modal } from 'antd'
import { IUserModalProps } from './types'

export const UserModal = ({ visible, user }: IUserModalProps) => {
  return (
    <Modal visible={visible} title="Title">
      <Button title="a" />
      <Button title="b" />
      <Button title="c" />
    </Modal>
  )
}
