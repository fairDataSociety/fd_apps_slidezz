import { useAtom } from 'jotai'

import { loadingModalAtom } from '../../store'
import LoadingModal from '../LoadingModal'
import NavBar from './NavBar/NavBar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [loadingModal] = useAtom(loadingModalAtom)

  return (
    <>
      <NavBar />
      {children}
      <LoadingModal
        isOpen={loadingModal.isOpen}
        message={loadingModal.message}
      />
    </>
  )
}

export default Layout
