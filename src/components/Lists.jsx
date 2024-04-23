import React from 'react'
import { formatCurrency } from '../hooks/FormatAmount';
import moment from "moment";

const Lists = ({budgets}) => {
   

  return (
    <div className="flex flex-col gap-4 p-6 justify-center text-lg font-serif h-fit">

        {
            budgets?.map((budget)=>(
                <div
                key={budget.id}
                className={`bg-gray-100 flex-grow text-black border-l-8 ${budget?.type === 'expense' ? 'border-red-500' : 'border-green-500'}  rounded-md px-3 py-1 h-fit`}>
                    <div className='flex items-center justify-between'>

                    <div>
                        <p>{budget?.name}</p>
                    <div className="text-gray-500 font-thin text-sm pt-1">
                    <span>{ moment(budget?.createdAt).format("dddd : DD-MM-YYYY")}</span>
                </div>

                    </div>

                        <div>
                        <p> {budget?.type === 'expense' ? '- ' : '+ '} {formatCurrency(budget?.amount)}</p>
                        </div>

                    </div>
               
        
                
            </div>
            ))
        }

    </div>
  )
}

export default Lists
