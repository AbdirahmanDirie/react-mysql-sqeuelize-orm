import React, { useEffect, useState } from "react";
import Lists from "../components/Lists";
import Form from "../components/Form";
import { useGetBudgetsQuery } from "../redux/budget/budget";
import { formatCurrency } from "../hooks/FormatAmount";

const Home = () => {
  const [totalIncome, setTotalIncome] = useState(0)
  const [totalExpense, setTotalExpense] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0);


  const {data:budgets, isLoading} = useGetBudgetsQuery();


useEffect(() => {

  if (!isLoading && budgets) {
    const total = budgets.reduce((acc, budget) => acc + budget.amount, 0);
    setTotalAmount(total);
}


  if (!isLoading && budgets) {
    const totalIncome = budgets
        .filter(budget => budget.type === 'income')
        .reduce((total, budget) => total + budget.amount, 0);
        setTotalIncome(totalIncome)
}

if (!isLoading && budgets) {
  const totalExpense = budgets
      .filter(budget => budget.type === 'expense')
      .reduce((total, budget) => total + budget.amount, 0);
      setTotalExpense(totalExpense)
}


}, [budgets, isLoading]); 


  return (
    <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">

      <div className="bg-blue-600 rounded-lg p-6 mb-5 flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <div>
          <p className="font-bold text-white text-lg">Income</p>
          <p className="font-bold text-gray-800 text-lg mt-2">{formatCurrency(totalIncome)}</p>
          </div>

          <div>
          <p className="font-bold text-white text-lg">Expense</p>
          <p className="font-bold text-gray-800 text-lg mt-2">{formatCurrency(totalExpense)}</p>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="flex justify-center flex-col items-center">
                <p className="font-bold text-white text-lg uppercase">Total</p>
          <p className="font-bold text-gray-800 text-lg mt-2">{formatCurrency(totalAmount || 0)}</p>
          </div>

          <div className="flex justify-center flex-col items-center">
                <p className="font-bold text-white text-lg uppercase">balance</p>
          <p className="font-bold text-gray-800 text-lg mt-2">{formatCurrency(totalIncome - totalExpense)}</p>
          </div>
    
        </div>
      </div>
      <div className="grid grid-cols-2">
        {
         budgets && budgets?.length === 0 ? <p>No Budget Fount</p> : <Lists budgets={budgets} />
        }
        
        <Form />
      </div>
    </div>
  );
};

export default Home;
