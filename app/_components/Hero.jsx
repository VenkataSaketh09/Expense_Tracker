// import React from 'react'

// function Hero() {
//   return (
//     <section className="bg-gray-50 flex items-center flex-col">
//   <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
//     <div className="mx-auto max-w-xl text-center">
//       <h1 className="text-3xl font-extrabold sm:text-5xl">
//         Manage You Expense
//         <strong className="font-extrabold text-primary sm:block mt-2"> Control Your Money </strong>
//       </h1>

//       <p className="mt-4 sm:text-xl/relaxed">
//         Start Creating Your Budget and save Your Money
//       </p>

//       <div className="mt-8 flex flex-wrap justify-center gap-4">
//         <a
//           className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
//           href="#"
//         >
//           Get Started
//         </a>

        
//       </div>
//     </div>
//   </div>
//   <img src={'./dash.png'} alt="image" width={1000} height={700} className='-mt-9 rounded-xl border-2'/>
// </section>
//   )
// }

// export default Hero
"use client"
import React from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';

function Hero() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push('/dashboard/budgets');
    } else {
      router.push('/sign-in');
    }
  };

  return (
    <section className="bg-gray-50 flex items-center flex-col">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Manage Your Expense
            <strong className="font-extrabold text-primary sm:block mt-2">
              Control Your Money
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Start Creating Your Budget and save Your Money
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={handleGetStarted}
              className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring  sm:w-auto"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
      <img src={'./myexpense.png'} alt="image" width={1000} height={700} className='-mt-9 rounded-xl border-2'/>
    </section>
  )
}

export default Hero;
