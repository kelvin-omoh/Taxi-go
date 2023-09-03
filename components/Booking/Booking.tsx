import React, { useContext } from 'react'
import AutocompleteAddress from './AutocompleteAddress'
import Cars from './Cars';
import Cards from './Cards';
import DistanceTime from './DistanceTime';
import { useFlutterwave } from 'flutterwave-react-v3';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import { useUser } from "@clerk/nextjs";
import { PriceOfCarContext } from '@/context/PriceOfCarContext';
 
function Booking() {
  const { isLoaded, isSignedIn, user } = useUser();
  const {priceOfCar,setpriceOfCar} 
  = useContext(PriceOfCarContext);
  const calculatedAmount = priceOfCar ? priceOfCar : 2000;

    // const screenHight=window.innerHeight*0.72;
    const config = {
      public_key: `FLWPUBK_TEST-841c10b026f35195c62cfc032d14c5a0-X`,
      tx_ref: Date.now(),
      amount: calculatedAmount,
      currency: 'NGN',
      payment_options: 'card,mobilemoney,ussd',
      customer: {
        email: `${user?.emailAddresses? user?.emailAddresses: "enaikeleomoh@gmail.com"}`,
         phone_number: `${user?.phoneNumbers}`,
        name: `${user?.fullName}`,
      },
      customizations: {
        title: `Taxi`,
        description: 'Payment for taxi',
        logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
      },
    };
  
    const handleFlutterPayment = useFlutterwave(config);
  

  return (
    <div className='p-5   '>
        <h2 className='text-[20px] font-semibold'>Booking</h2>
        <div className='border-[1px]   p-5 
        rounded-md' >
        <AutocompleteAddress/>
       
        <Cars/>
        <Cards/>
        <button 
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => { 
              console.log(response);
             
                closePaymentModal() // this will close the modal programmatically

            },
            onClose: () => {},
          });
        }}
        
        
        
        
        className='w-full
         bg-yellow-400
        p-1 rounded-md
        mt-4'>Book</button>
        
        </div> 
    </div>
  )
}

export default Booking