import React, { useEffect, useState } from 'react'
import { useCreateBudgetMutation } from '../redux/budget/budget';
import { toast } from "react-toastify";



const Form = () => {
    const [formData, setFormData] = useState({
        name:'',
        amount:0,
        type:'income',
    })

    const [createBudget, { data, isError, error, isLoading }] = useCreateBudgetMutation();

    const handleChange = (e) => {
        setFormData({
           ...formData,
            [e.target.name]:e.target.value
        })
    }

    useEffect(() => {
 
        if (isError) {
          toast.error(error.data.msg);
        }

        if (data) {
          toast.success(data.msg);
        }
      }, [data, isError, error,]);
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        await createBudget({formData}).unwrap();
        setFormData({
            name:'',
            amount:0,
            type:'',
        })
    }

    
  return (
    <div className="bg-white p-10 rounded-lg shadow">
            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label  className="block mb-2 font-bold text-gray-600">Budget Name</label>
                    <input type="text"  placeholder="Budget Name" className="border border-gray-300 shadow p-3 w-full rounded mb-"
                    name="name"
                    value={formData?.name}
                    onChange={handleChange}
                    />
                </div>
                <div className="mb-5">
                    <label  className="block mb-2 font-bold text-gray-600">Budget Amount</label>
                    <input type="number" placeholder="Budget Amount" className="border border-gray-300 shadow p-3 w-full rounded mb-" 
                    name="amount"
                    value={formData?.amount}
                    onChange={handleChange}
                    />
                </div>

                <div className="mb-16">
                    <label className="block mb-2 font-bold text-gray-600">Budget Type</label>
                    <select className="border border-gray-300 shadow p-3 w-full rounded mb-" 
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>


                <button className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg"
                disabled={
                    !formData.name || !formData.amount
                }
                type='submit'>
                  {
                    isLoading ? 'Loading...' : 'Save Budget'
                  }  
                    </button>
            </form>
        </div>
  )
}

export default Form
