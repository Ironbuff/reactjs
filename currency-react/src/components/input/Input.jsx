import React from 'react'

const Input = () => {
  
    // contain two object label and className
    function Input({
        label,
        className="",
        amount,
        onAmountChange,//method use to show when amount change
        onCurrencyChange,//method use to show when currency change
        currencyOption= [],//use to different currency option avilable
        selectCurrency="usd", //default currency value
        currencyDisable= false,
        
    })
  {
    const amountInputId = useId() //generate unique IDs that can be passed to acessibility attributes
    return (
    // here we are using latex to take style from user
    <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
        <div className='w-1/2'>
                <label  htmlFor={amountInputId}
                className='text-neutral-800 mb-2 inline-block'>
                    {label}
                </label>
                
                <input 
                id={amountInputId}
                className='outline-none w-full bg-transparent py-1.5'
                type='number'
                placeholder='Amount'
                disabled={amountDisable}// it shows that amount is disabled
                value={amount}//to take amount variable value
                onChange={(e)=> onAmountChange && onAmountChange(Number(e.target.value))}//here the value will call onAmountChange method when it has certain value
                />
        </div>
        <div className='w-1/2 flex flex-wrap justify-end text-right'>

        <p className='text-black/40 mb-2 w-full'>
        Currency Type
        </p>

        <select 
        className='rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none' 
        value={selectCurrency} 
        onChange={(e)=> onCurrencyChange && onCurrencyChange(e.target.value)}
        disabled={currencyDisable}>
            {currencyOption.map((currency)=>(
                <option
                key={currency}
                value={currency}>
                {currency}
            </option>
            ))}
        </select>
        </div>
        
    </div>
  )
}
}

export default Input;