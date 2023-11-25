import { LecturesPage, LoginPage } from '@src/components/Loader/lazy'
import { useAuthUser } from 'react-auth-kit'

const HomePage = () => {
  const authUser = useAuthUser()()
  return authUser && authUser.token ? <LecturesPage /> : <LoginPage />
}

export default HomePage
