import Footer from "../ui/dashboard/Footer/footer";
import { raleway } from "../ui/fonts";
import { Private } from "../lib/routes/Private";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Private>
            <div className={`${raleway.className} antialiased bg-[#151718] w-full md:max-w-[1440px] h-screen mx-auto`}>
                {children}
                {/* <div className="w-full">
                <Footer />
            </div> */}
            </div>
        </Private>
    )
}