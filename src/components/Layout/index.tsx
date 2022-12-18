import { useAtom } from 'jotai'

import useFairOSCookieRenewal from '../../hooks/useFairOSCookieRenewal'
import { loadingModalAtom } from '../../store'
import LoadingModal from '../LoadingModal'
import NavBar from './NavBar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [loadingModal] = useAtom(loadingModalAtom)
  useFairOSCookieRenewal()

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
