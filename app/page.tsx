"use client"

import Booking from '@/components/Booking/Booking'
import MapboxMap from '@/components/Map/MapBoxMap'
import { DestinationCordiContext } from '@/context/DestinationCordiContext';
import { DirectionDataContext } from '@/context/DirectionDataContext';
import { PriceOfCarContext } from '@/context/PriceOfCarContext';
import { SourceCordiContext } from '@/context/SourceCordiContext';
import { UserLocationContext } from '@/context/UserLocationContext';

import Image from 'next/image'
import { useEffect, useState } from 'react';
export default function Home() {
  const [userLocation,setUserLocation]=useState<any>();
  const [priceOfCar,setpriceOfCar]=useState<any>();
  const [soruceCordinates,setSourceCordinates]=useState<any>([]);
  const [destinationCordinates,setDestinationCordinates]=useState<any>([]);
  const [directionData,setDirectionData]=useState<any>([]);


  useEffect(()=>{
    getUserLocation();
  },[])
  const getUserLocation=()=>{
    navigator.geolocation.getCurrentPosition(function(pos){
      setUserLocation({
        lat:pos.coords.latitude,
        lng:pos.coords.longitude
      })
    })
  }
  return (
    <div className=' h-[100vh] flex justify-center items-center'>
      <UserLocationContext.Provider value={{userLocation,setUserLocation}}>
      <SourceCordiContext.Provider value={{soruceCordinates,setSourceCordinates}}>
      <DestinationCordiContext.Provider value={{destinationCordinates,setDestinationCordinates}}>
      <DirectionDataContext.Provider value={{directionData,setDirectionData}}>
        <PriceOfCarContext.Provider value={{priceOfCar,setpriceOfCar}}>


       
     <div className='grid  grid-cols-1 
     md:grid-cols-3'>
        <div className=''>
          <Booking/>
        </div>
        <div className='col-span-2
        '>
          <MapboxMap/>
        </div>
     </div>
     </PriceOfCarContext.Provider>
     </DirectionDataContext.Provider>
     </DestinationCordiContext.Provider>
     </SourceCordiContext.Provider>
     </UserLocationContext.Provider>
    </div>
  )
}
