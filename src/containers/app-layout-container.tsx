import React from 'react'

import { AppLayout, IAppAction } from '../components/app-layout'
import { UsersTableContainer } from './users-table-container'

import { generate } from '../store/users/thunks'
import { useAppDispatch, useAppSelector } from '../store'
import { createUserModal } from '../store/user-modal/thunks'
import { dismissModal, setUser } from '../store/user-modal/actions'
import { UserModal } from '../components/user-modal'
import { createUser, deleteUser, updateUser } from '../store/users/actions'
import { IUser } from 'models'

export const AppLayoutContainer = () => {
  const dispatch = useAppDispatch()

  const { visible, operation, fetching, user } = useAppSelector(
    (s) => s.userModal
  )

  const actions: IAppAction[] = [
    {
      key: 'generate',
      title: 'Сгенерировать еще раз',
      action: () => dispatch(generate(20))
    },
    {
      key: 'tap',
      title: 'Добавить пользователя',
      action: () => {
        dispatch(createUserModal())
      }
    }
  ]

  const selectSubmit = () => {
    switch (operation) {
      case 'create':
        return (user: IUser) => {
          dispatch(createUser(user))
          dispatch(dismissModal())
        }
      case 'update':
        return (user: IUser) => {
          dispatch(updateUser(user))
          dispatch(dismissModal())
        }
      case 'delete':
        return (user: IUser) => {
          dispatch(deleteUser(user))
          dispatch(dismissModal())
        }
    }
  }

  return (
    <AppLayout actions={actions}>
      <UsersTableContainer />
      <UserModal
        onCancel={() => dispatch(dismissModal())}
        onSubmit={selectSubmit()}
        visible={visible}
        operation={operation}
        fetching={fetching}
        user={user}
      />
    </AppLayout>
  )
}
