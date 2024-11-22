import Footer from '@/components/footer'
import HeaderOne from '@/components/header/headerOne'

const Layout = ({ children }) => {
    return (
        <>
            <HeaderOne />
            {children}
            <Footer />
        </>
    )
}

export default Layout