import Header from '@/components/auth/Header'
import Login from '@/containers/student/login/Login'
import React from 'react'

function page() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className='container mx-auto'>
                <Login />
            </main>
        </div>
    )
}

export default page