import { DirectionDataContext } from '@/context/DirectionDataContext';
import { PriceOfCarContext } from '@/context/PriceOfCarContext';
import CarsList from '@/data/CarsList'
import Image from 'next/image'
import React, { useContext, useState } from 'react'

function Cars() {
    const [selectedCar,setSelectedCar]=useState<any>()
    const {directionData, setDirectionData} 
    = useContext(DirectionDataContext);
    const {priceOfCar,setpriceOfCar} 
    = useContext(PriceOfCarContext);

    const getCost=(charges:any)=>{
      if (charges && directionData && directionData.routes[0] && directionData.routes[0].distance) {
        const cost = charges * directionData.routes[0].distance * 0.000621371192;
        setpriceOfCar(cost.toFixed(2)); 
        return cost.toFixed(2);
      } else {
        setpriceOfCar((999999999 * 0.000621371192).toFixed(2));

        return (999999999 * 0.000621371192).toFixed(2)
          
          ;
      }
    
    }
  return (
    <div className='mt-3'>
        <h2 className='font-medium text-[14px] '>Select Car</h2>
        <div className='grid 
        grid-cols-3 
        md:grid-cols-2
        lg:grid-cols-3
         '>
            {CarsList.map((item,index)=>(
                <div key={index} className={`m-2
                 p-2 border-[1px] rounded-md 
                 hover:border-yellow-400 
                 cursor-pointer 
                 ${index==selectedCar
                    ?'border-yellow-400 border-[2px]'
                    :null}`}
                 onClick={()=>setSelectedCar(index)}>
                    <Image src={item.image}
                    alt={item.name}
                    width={75}
                    height={90}
                    className='w-full'
                    />
                    <h2 className='text-[10px] text-gray-500'>{item.name}
                   {directionData.routes?
                    <span className='float-right font-medium
                     text-black'>
                     {getCost(item.charges)}
                     $</span>:null}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Cars