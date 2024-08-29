import { inter, raleway } from "../../fonts"

export default function Footer() {
    return (
        <div className="flex w-full py-[30px] bg-customPink">
            <div className="w-full px-[24px] h-full">
                <p className={`${raleway.className} antialiased w-full text-[32px] text-white font-semibold my-[20px]`}>
                    Footer Text
                </p>
                <p className={`${inter.className} antialiased w-full my-[12px] text-[12px] text-white`}>
                    © BISH! TECHNOLOGIES
                </p>
            </div>
        </div>
    )
}