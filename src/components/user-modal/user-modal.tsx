import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Space
} from 'antd'

import { IUserModalLayoutProps, IUserModalProps } from './types'

import React, { useEffect, useState } from 'react'

import {
  PhoneOutlined,
  MobileOutlined,
  MailOutlined,
  UserOutlined
} from '@ant-design/icons'

import moment from 'moment'
import { ageFromDate } from '../../utils'

export const UserModal = ({
  visible,
  user,
  operation,
  onCancel,
  onSubmit
}: IUserModalProps) => {
  const { title, first, last } = user.name

  const modalTitle = () => {
    switch (operation) {
      case 'create':
        return 'Добавить пользователя'
      case 'delete':
        return 'Удалить пользователя'
      case 'update':
        return 'Редактирование данных о пользователе'
    }
  }

  const selectLayout = () => {
    switch (operation) {
      case 'create':
      case 'update':
        return (
          <UserModalLayout
            user={user}
            onSubmit={onSubmit}
            onCancel={onCancel}
          />
        )
      case 'delete':
        return (
          <p>
            Вы уверены, что хотите удалить пользователя{' '}
            {title + ' ' + first + ' ' + last}?
          </p>
        )
    }
  }
  const selectFooter = () => {
    switch (operation) {
      case 'create':
      case 'update':
        return null
      case 'delete':
        return (
          <Space size={'large'} key={'user-modal-form-space-btn'}>
            <Button key={'user-modal-form-btn-cancel'} onClick={onCancel}>
              Отмена
            </Button>
            <Button
              key={'user-modal-form-btn-submit'}
              type="primary"
              htmlType="submit"
              danger
              onClick={() => onSubmit(user)}
            >
              Удалить
            </Button>
          </Space>
        )
      default:
        undefined
    }
  }

  return (
    <Modal
      visible={visible}
      title={modalTitle()}
      footer={selectFooter()}
      onCancel={onCancel}
    >
      {selectLayout()}
    </Modal>
  )
}

const UserModalLayout = ({
  user,
  onCancel,
  onSubmit
}: IUserModalLayoutProps) => {
  const { name, dob, phone, cell, email } = user
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      title: name.title,
      first: name.first,
      last: name.last,
      phone: phone,
      cell: cell,
      email: email,
      dob: moment(dob.date)
    })
  }, [name, email, phone, dob, cell])

  return (
    <Form
      form={form}
      layout="vertical"
      style={{ maxWidth: 600 }}
      name={'user-modal-form-data'}
      onFinish={(v) => {
        const nameForm = { title: v.title, first: v.first, last: v.last }
        const dobForm = {
          date: v.dob.toDate().toISOString(),
          age: ageFromDate(v.dob.toDate().toISOString())
        }

        const userFormData = {
          name: nameForm,
          dob: dobForm,
          phone: v.phone,
          cell: v.cell,
          email: v.email
        }

        let userTmp = { ...user, ...userFormData }

        onSubmit(userTmp)
      }}
    >
      <Space size={'small'} key={'user-modal-form-name'}>
        <Form.Item
          name={'title'}
          key={'user-modal-form-name-title'}
          label="Приставка"
        >
          <Input
            prefix={<UserOutlined rev={undefined} />}
            size="middle"
            placeholder="Приставка..."
          />
        </Form.Item>

        <Form.Item
          name={'first'}
          key={'user-modal-form-name-first'}
          label="Имя"
          rules={[{ required: true, message: 'Пожалуйста, введите имя!' }]}
        >
          <Input
            prefix={<UserOutlined rev={undefined} />}
            size="middle"
            placeholder="Имя..."
          />
        </Form.Item>

        <Form.Item
          name={'last'}
          key={'user-modal-form-name-last'}
          label="Фамилия"
          rules={[{ required: true, message: 'Пожалуйста, введите фамилию!' }]}
        >
          <Input
            prefix={<UserOutlined rev={undefined} />}
            size="middle"
            placeholder="Фамилия..."
          />
        </Form.Item>
      </Space>

      <Space size={'small'} key={'user-modal-form-contacts'}>
        <Form.Item
          name={'email'}
          key={'user-modal-form-contacts-email'}
          label="E-mail"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите адрес электронной почты!'
            }
          ]}
        >
          <Input
            prefix={<MailOutlined rev={undefined} />}
            size="middle"
            placeholder="E-mail..."
          />
        </Form.Item>

        <Form.Item
          name={'phone'}
          key={'user-modal-form-contacts-phone'}
          label="Телефон"
          rules={[
            { required: true, message: 'Пожалуйста, введите номер телефона!' }
          ]}
        >
          <Input
            prefix={<PhoneOutlined rev={undefined} />}
            type="phone"
            size="middle"
            placeholder="Телефон..."
          />
        </Form.Item>

        <Form.Item
          name={'cell'}
          key={'user-modal-form-contacts-cell'}
          label="Сотовый телефон"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите номер сотового телефона!'
            }
          ]}
        >
          <Input
            prefix={<MobileOutlined rev={undefined} />}
            type="phone"
            size="middle"
            placeholder="Сотовый телефон..."
          />
        </Form.Item>
      </Space>

      <Form.Item
        key={'user-modal-form-dob'}
        name={'dob'}
        label="Дата рождения"
        rules={[
          { required: true, message: 'Пожалуйста, выберите дату рождения!' }
        ]}
      >
        <DatePicker
          inputReadOnly
          format={'DD.MM.YYYY'}
          placeholder="Дата рождения..."
        />
      </Form.Item>

      <Form.Item>
        <Space size={'large'} key={'user-modal-form-space-btn'}>
          <Button key={'user-modal-form-btn-cancel'} onClick={onCancel}>
            Отмена
          </Button>
          <Button
            key={'user-modal-form-btn-submit'}
            type="primary"
            htmlType="submit"
          >
            Подтвердить
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
