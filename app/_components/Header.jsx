
"use client"
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <div className='p-5 flex justify-between items-center border shadow-sm'>
      <Image src={'./logo.svg'} alt="logo" width={160} height={100} />

      <div className="flex gap-4">
        {
          isSignedIn ? <UserButton /> : (
            <Link href={'/sign-in'}>
              <Button>Get Started</Button>
            </Link>
          )
        }
        {
          isSignedIn ? (
            <Link href={'/dashboard'}>
              <Button>Dashboard</Button>
            </Link>
          ) : (
            <Link href={'/sign-in'}>
              <Button>Dashboard</Button>
            </Link>
          )
        }
      </div>
    </div>
  )
}

export default Header;
