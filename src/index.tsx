import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'current-script-polyfill'

import dayjs from 'dayjs'
import ru from 'dayjs/locale/ru'
dayjs.locale(ru)

import React from 'react'
import ReactDOM from 'react-dom'

import { ReactApplicationContainer } from './containers/react-application-container'

import 'antd/dist/antd.min.css'

// import '../micro-app-mf-decl.d'
// const Button = React.lazy(() => import('microapp-mf/Button'))

const container = document.getElementById('root')
ReactDOM.render(
  <ReactApplicationContainer
    // MFSiderElem={<Button buttonName={'Hello World!'} />}
  />,
  container
)
