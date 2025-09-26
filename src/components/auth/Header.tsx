import React from 'react'
import { ThemeToggle } from '../ThemeToggle'

function Header() {
    return (
        <header className='w-full border-b'>
            <nav className='container py-4 mx-auto flex justify-between items-center'>
                <div>
                    <span>LOGO</span>
                </div>
                <div>
                    <ThemeToggle />
                </div>
            </nav>
        </header>
    )
}

export default Header