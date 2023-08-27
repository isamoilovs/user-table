import React from 'react'

import { AppLayout, IAppAction } from '../components/app-layout'
import { UsersTableContainer } from './users-table-container'

import { generate } from '../store/users/thunks'
import { useAppDispatch, useAppSelector } from '../store'
import { createUser } from '../store/user-modal/thunks'
import { dismissModal } from '../store/user-modal/actions'
import { UserModal } from '../components/user-modal'

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
        dispatch(createUser())
      }
    }
  ]

  return (
    <AppLayout actions={actions}>
      <UsersTableContainer />
      <UserModal
        onCancel={() => dispatch(dismissModal())}
        onSubmit={() => {}}
        visible={visible}
        operation={operation}
        fetching={fetching}
        user={user}
      />
    </AppLayout>
  )
}
