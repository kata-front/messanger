import Link from "next/link";
import { FC } from "react";

const Button: FC<{
    children: string
    classes: string
    href: string
}> = ({ children, classes, href }) => {
    return <Link href={href} className={`${classes} inline-flex items-center justify-center cursor-pointer my-5 bg-linear-to-r from-gradient-1 to-gradient-2 text-center rounded-3xl text-white text-xl font-sans transition-transform duration-300 hover:-translate-y-1.25 hover:scale-105`}>{children}</Link>
}

export default Button