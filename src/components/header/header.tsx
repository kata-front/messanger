import Link from "next/link"

const Header = () => {
    return (
        <header className='h-[10vh] p-5 w-full flex items-center justify-between bg-black'>
            <section className='h-full flex items-center gap-2'>
                <div className='h-full rounded-full'>
                    <img src="/logo.jpeg" alt="logo" className='size-full object-cover object-center' />
                </div>
                <span className='text-2xl font-mono'>New - Messanger</span>
            </section>
            
            <nav className='flex items-center gap-4'>
                <Link className='text-lg font-mono' href="/">Home</Link>
                <Link className='text-lg font-mono' href="/contact">Contact</Link>
                <Link className='text-lg font-mono' href="/about">About</Link>
            </nav>
        </header>
    )
}

export default Header