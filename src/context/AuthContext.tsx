// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, RegisterParams, LoginParams, ErrCallbackType, UserDataType } from './types'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setIsInitialized: () => Boolean,
  register: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const [isInitialized, setIsInitialized] = useState<boolean>(defaultProvider.isInitialized)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      setIsInitialized(true)
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!

      if (storedToken) {
        setLoading(true)
        await axios
          .get(authConfig.userInfo, {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          })
          .then(async response => {
            setLoading(false)

            const { data } = response.data
            setUser({ ...data.info })
          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
            handleLogout()

            // initAuth()
          })
      } else {
        setLoading(false)
      }
    }
    initAuth()
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(authConfig.loginEndpoint, params)
      .then(async res => {
        const { data } = res.data
        window.localStorage.setItem(authConfig.storageTokenKeyName, data.accessToken)
      })
      .then(() => {
        axios
          .get(authConfig.userInfo, {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
            }
          })
          .then(async response => {
            const returnUrl = router.query.returnUrl
            const { data } = response.data
            setUser({ ...data.info })
            await window.localStorage.setItem('userData', JSON.stringify(data.info))
            localStorage.setItem('organizationId', data.info?.organization_id)
            localStorage.setItem('id', data?.info?.id);
            localStorage.setItem('userName', data.info?.name)
            localStorage.setItem('isAdmin',data.isAdmin);
            localStorage.setItem('role_name',data.role_name);
            localStorage.setItem('organizationName', data.organization?.name);
            localStorage.setItem('organizationGrpName', data.organization_group?.organization_group_name);

            localStorage.setItem('email', data.info?.email);

            const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

            router.replace(redirectURL as string)
          })
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    setIsInitialized(false)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    localStorage.clear()
    router.push('/login')
    window.location.reload()
  }

  const handleRegister = (params: RegisterParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then(res => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error)
        } else {
          router.replace('/register/wait-approval')

          // handleLogin({ username: params.email, password: params.password })
        }
      })
      .catch((err: { [key: string]: string }) => (errorCallback ? errorCallback(err) : null))
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
