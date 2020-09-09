import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import UserApi from 'shared/Api/UserApi'
import { User } from 'shared/Api/types'
import { LoadingStatus } from 'app/store'

const useFetchUsers = () => {
  const [users, setUsers] = useState<User[]>([])
  const [status, setStatus] = useState<LoadingStatus>('idle')
  const [error, setError] = useState<string>('')
  const fetchUsers = () => {
    const userApi = new UserApi();
    setStatus('pending');
    setError('')
    userApi.fetchAll()
    .then((res) => {
      setUsers(res)
    })
    .catch(() => {
      setError('Unable to fetch users at this time..')
    })
    .finally(() => {
      setStatus('fulfilled');
    })
  }
  return [users, fetchUsers, status, error]
}

export default useFetchUsers
