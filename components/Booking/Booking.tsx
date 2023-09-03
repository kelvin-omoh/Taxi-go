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


  interface FlutterwaveConfig {
    public_key: string;
    tx_ref: string; // Change to string type since Date.now() returns a number
    amount: number; // Change 'any' to 'number' assuming amount is a number
    currency: string;
    payment_options: string;
    customer: {
      email: string;
      phone_number: string;
      name: string;
    };
    customizations: {
      title: string;
      description: string;
      logo: string;
    };
  }
  
   const config: FlutterwaveConfig = {
  public_key: `FLWPUBK_TEST-841c10b026f35195c62cfc032d14c5a0-X`,
  tx_ref: Date.now().toString(), // Ensure tx_ref is a string
  amount: calculatedAmount, // Assuming calculatedAmount is a number
  currency: 'NGN',
  payment_options: 'card,mobilemoney,ussd',
  customer: {
    email: `${user?.emailAddresses ? user?.emailAddresses : 'enaikeleomoh@gmail.com'}`,
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
        <div className='border-[1px] p-4 
        rounded-md' >
        <AutocompleteAddress/>
       
        <Cars/>
        <Cards/>
        <button 
        onClick={() => {
          if(priceOfCar){

              handleFlutterPayment({
            callback: (response) => { 
              console.log(response);
             
                closePaymentModal() // this will close the modal programmatically

            },
            onClose: () => {},
          });


          }else{
            alert("please select a car and put your location")
          }
        
        }}
        
        
        
        
        className={`w-full
        ${priceOfCar ? '   bg-yellow-400 cursor-pointer':'bg-gray-200 cursor-not-allowed'}
      
        p-2 rounded-md
        mt-4`}>Book</button>
        
        </div> 
    </div>
  )
}

export default Booking