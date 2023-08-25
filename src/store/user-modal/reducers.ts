import { createReducer } from '@reduxjs/toolkit'

import { IUserModalState } from './types'

import { setVisible } from './actions'

const initialState: IUserModalState = {
  visible: false
}

export const applicationReducer = createReducer(initialState, (builder) =>
  builder.addCase(setVisible, (state) => {
    console.log('applicationReducer present state: ', state)
    return { ...state, visible: !state.visible }
  })
)
