import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../api/users.js'
import { useAuth } from '../contexts/AuthContext.jsx'

export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const [, settoken] = useAuth()

  const loginMutation = useMutation({
    mutationFn: () => login({ username, password }),
    onSuccess: (data) => {
      settoken(data.token)
      navigate('/')
    },
    onError: () => alert('failed to login!'),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    loginMutation.mutate()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Link to='/'>Back to main page</Link>
      <div>
        <label htmlFor='create-username'>Username: </label>
        <input
          type='text'
          name='create-username'
          id='create-username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor='create-password'>Password: </label>
        <input
          type='password'
          name='create-password'
          id='create-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
      <input
        type='submit'
        value={loginMutation.isPending ? 'Loggin in...' : 'Log in'}
        disabled={!username || !password || loginMutation.isPending}
      />
    </form>
  )
}
