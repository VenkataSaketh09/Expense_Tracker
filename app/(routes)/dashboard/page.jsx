"use client"
import React, { useEffect ,useState} from 'react'
import { UserButton, useUser } from '@clerk/nextjs'
import CardsInfo from './_components/CardsInfo'
import { desc, eq, getTableColumns,sql } from 'drizzle-orm'
import { db } from '@/utils/dbconfig'
import { Budgets,Expenses } from '@/utils/schema'
import BarChartDashboard from './_components/BarChartDashboard'
import BudgetItem from './budgets/_components/BudgetItem'
import ExpenseListTable from './expenses/_components/ExpenseListTable'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
function Dashboard() {
  const {user}=useUser()
  const[budgetList,setBudgetList]=useState([]);
  const[expensesList,setExpensesList]=useState([]);
  useEffect(()=>{
    user&&getBudgetList();
  },[user])

  const getBudgetList=async()=>{
    const result=await db.select({
      ...getTableColumns(Budgets),
      totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
      totalItem:sql `count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
    .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
    .groupBy(Budgets.id)
    .orderBy(desc(Budgets.id))
    setBudgetList(result);
    getAllExpenses();
    // console.log(result);
  }
  const getAllExpenses=async()=>{
    const result=await db.select({
      id:Expenses.id,
      name:Expenses.name,
      amount:Expenses.amount,
      createdAt:Expenses.createdAt
    }).from(Budgets)
    .rightJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(Expenses.id))
    setExpensesList(result);
    // console.log(result);
  }
  return (
    <div className='p-8'>
      <div className="flex items-center gap-3">
        {/* Arrow pointing left, linking to home page */}
        <Link href="/">
          <ArrowLeft className="cursor-pointer" />
        </Link>
        <h2 className='font-bold text-3xl'>Hi, {user?.fullName} 😎</h2>
      </div>
      <p className='text-gray-500'>
        Here&apos;s what&apos;s happening with your money, Let&apos;s Manage your Expense
      </p>
      
      <CardsInfo budgetList={budgetList} />
      
      <div className='grid grid-cols-2 md:grid-cols-2 mt-6 gap-5'>
        <div className='md:grid-cols-2'>
          <BarChartDashboard budgetList={budgetList} />
          <ExpenseListTable
            expensesList={expensesList}
            refreshData={() => getBudgetList()}
          />
        </div>
        
        <div className='grid gap-2'>
          {budgetList?.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard