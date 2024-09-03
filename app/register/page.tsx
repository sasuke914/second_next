import AcmeLogo from "@/app/ui/logo"
import RegisterForm from "../ui/register/register-form"

export default function RegisterPage() {
    return (
        <main className="flex items-center jusfify-center md:h-screen bg-[#151718]">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
                    <div className="w-32 text-white md:w-36">
                        <AcmeLogo />
                    </div>
                </div>
                <RegisterForm />
            </div>
        </main>
    )
}