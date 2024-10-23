"use client"
import { Budgets,Expenses } from '@/utils/schema'
import React, { useEffect, useState } from 'react'
import { eq, and, getTableColumns,sql, desc } from 'drizzle-orm'
import { db } from '@/utils/dbconfig'
import { useUser } from '@clerk/nextjs';

import ExpenseListTable from './_components/ExpenseListTable'
import { toast } from 'sonner'



function ExpensesData({params}) {
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
    const deleteBudget = async () => {
        // First, delete the related expenses that reference the budget
        const deleteExpensesResult = await db.delete(Expenses)
          .where(eq(Expenses.budgetId, params.id)) // Delete expenses where budgetId matches
          .returning(); // Optional: if you want to see the deleted rows
        
        // Check if the expenses were deleted or not
        if (deleteExpensesResult) {
          // Now delete the budget itself
          const result = await db.delete(Budgets)
            .where(eq(Budgets.id, params.id))
            .returning(); // Get the deleted budget details if needed
        }
      
        toast('Budget Deleted Successfully!');
        route.replace('/dashboard/budgets');
      }
  return (
    <div className='mt-4'>
        <ExpenseListTable  expensesList={expensesList} refreshData={()=>getBudgetInfo()}/>
      </div>
  )
}

export default ExpensesData