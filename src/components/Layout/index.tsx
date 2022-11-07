import NavBar from './NavBar/NavBar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  )
}

export default Layout
