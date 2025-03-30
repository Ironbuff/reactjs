import { useState } from 'react'
import { Input } from './components/input'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import './App.css'

function App() {
  const [amount, setAmount] = useState(0) //to set intial amount
  const [from,setForm]= useState('usd') //to set intial currency
  const [to,setTo]= useState('npr') //to set transform currency
  const[convertedAmount, setConvertedAmount] = useState(0) //the total converted Amount

  const currencyInfo = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo) //to all the converted currency info from set currency
  
  // use to convert currency from one currency to another

  //function to convert currency into preferred currency
  const convert = () =>{
    
    setConvertedAmount(amount * currencyInfo[to])
  }
  const swap= ()=>{
    setConvertedAmount(amount)
    setAmount(convertedAmount)
    setForm(to)
    setTo(from)
  }
  return (
    <>
    <div
    className='w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat'
    style={{backgroundImage:`url('${BackgroundImage}')`}}
    >
      <div className='w-full'>
        <div className='w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30'>
           <form onSubmit={(e)=>{
            e.preventDefault(); //prevent the page from reloading
            convert()
           }}>
            <div className='w-full mt-1 mb-1'>
              <Input
              label="From"
              amount={amount}
              currencyOption={options}
              onCurrencyChange={(currency)=>setAmount(amount)}
              selectCurrency={from}
              onAmountChange={(amount)=>setAmount(amount)}/>
            </div>
            <div className='relative w-full h-0.5'>
              <button
              type='button'
              className='absolute left-1/2 translate-x-1/2 translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5'
              onClick={swap}>
                swap
              </button>
            </div>
            <div className='w-full mt-1 mb-1'>
              <Input
              label="To"
              amount={convertedAmount}
              currencyOption={options}
              onCurrencyChange={(Currency)=>setTo(Currency)}
              selectCurrency={from}
              amountDisable/>
            </div>
            <button type='submit'
            className='w-full bg-blue-600 text-white px-4 oy-3 rounded-lg'>
              Convert {from.toUpperCase()}to{to.toUpperCase()}
            </button>
           </form>
        </div>
      </div>

    </div>
    
    </>
  )
}

export default App
