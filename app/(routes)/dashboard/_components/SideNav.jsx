'use client';
import { UserButton } from '@clerk/nextjs';
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import Link from 'next/link';
function SideNav() {
    const menuList = [
        {
            id: 1,
            name: 'Dashboard',
            icon: LayoutGrid,
            path: '/dashboard',
        },
        {
            id: 2,
            name: 'Budgets',
            icon: PiggyBank,
            path: '/dashboard/budgets',
        },
        {
            id: 3,
            name: 'Expenses',
            icon: ReceiptText,
            path: '/dashboard/expenses',
        },
        {
            id: 4,
            name: 'Upgrade',
            icon: ShieldCheck,
            path: '/dashboard/upgrade',
        },
    ];

    const path = usePathname();

    useEffect(() => {
        console.log(path);
    }, [path]);

    return (
        <div className="h-screen p-5 border shadow-sm">
            <img src={'/logo.svg'} alt="logo" width={160} height={100} />
            <div>
                {menuList.map((menu, index) => (
                    <Link href={menu.path} key={index}>
                    <h2
                        key={index}
                        className={`flex gap-5 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-md hover:bg-blue-200 ${
                            path.startsWith(menu.path) && 'text-primary '
                        }`}
                    >
                        <menu.icon />
                        {menu.name}
                    </h2>
                    </Link>
                ))}
            </div>
            <div className="fixed bottom-10 p-5 flex gap-2">
                <UserButton />
                <h3>Profile</h3>
            </div>
        </div>
    );
}

export default SideNav;
