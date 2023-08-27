import React from 'react'

import { UsersTable } from '../components/users-table'

import { useAppDispatch, useAppSelector } from '../store'
import { IUser } from 'models'
import { deleteUser, editUser } from '../store/user-modal/actions'

export const UsersTableContainer = () => {
  const { users, fetching } = useAppSelector((s) => s.users)
  const dispatch = useAppDispatch()

  return (
    <UsersTable
      loading={fetching}
      users={users}
      editUser={(user: IUser) => dispatch(editUser(user))}
      deleteUser={(user: IUser) => dispatch(deleteUser(user))}
    />
  )
}
