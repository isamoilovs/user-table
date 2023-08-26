import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  Modal,
  Select,
  Space
} from 'antd'
import { IUserModal, IUserModalProps } from './types'
import React, { useEffect, useState } from 'react'
import {
  PhoneOutlined,
  MobileOutlined,
  MailOutlined,
  UserOutlined
} from '@ant-design/icons'
import moment from 'moment'

export const UserModal = ({
  visible,
  user,
  operation,
  onCancel,
  onSubmit
}: IUserModalProps) => {
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
          <CreateUserLayout {...user} onSubmit={onSubmit} onCancel={onCancel} />
        )
      case 'delete':
        return (
          <p>
            Вы уверены, что хотите удалить пользователя{' '}
            {user.name.title + ' ' + user.name.first + ' ' + user.name.last}?
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

const CreateUserLayout = ({
  name,
  email,
  phone,
  dob,
  cell,
  onCancel,
  onSubmit
}: IUserModal) => {
  const [form] = Form.useForm()
  const [birthday, setBirthday] = useState(new Date(dob.date))

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
      onFinish={(v) => console.log('finished:', v)}
    >
      <Space size={'small'} key={'user-modal-form-name'}>
        <Form.Item
          name={'title'}
          key={'user-modal-form-name-title'}
          label="Приставка"
        >
          <Input
            prefix={<UserOutlined />}
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
          <Input prefix={<UserOutlined />} size="middle" placeholder="Имя..." />
        </Form.Item>

        <Form.Item
          name={'last'}
          key={'user-modal-form-name-last'}
          label="Фамилия"
          rules={[{ required: true, message: 'Пожалуйста, введите фамилию!' }]}
        >
          <Input
            prefix={<UserOutlined />}
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
            prefix={<MailOutlined />}
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
            prefix={<PhoneOutlined />}
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
            prefix={<MobileOutlined />}
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
