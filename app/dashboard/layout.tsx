import Footer from "../ui/dashboard/Footer/footer";
import SideNav from "../ui/dashboard/sidenav";
import { raleway } from "../ui/fonts";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        // <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        //     <div className="w-full flex-none md:w-64">
        //         <SideNav />
        //     </div>
        //     <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        // </div>
        <div className={`${raleway.className} antialiased w-full md:max-w-[1440px] mx-auto`}>
            {children}
            {/* <div className="w-full">
                <Footer />
            </div> */}
        </div>
    )
}