import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import React from 'react'
import ProductData from './ProductData';

export default async function ProductWrapper({lng}:LanguageToggleProps) {
   const endpoint =
    "http://109.123.252.176:5000/api/products?page_size=100&page_number=1";

  const session = await getServerSession(authOptions);
  const fetchData = async (): Promise<Product[]> => {
    try {
      const res = await axios.get(endpoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${session?.user.access_token}`,
        },
      });
      return res.data.data.records ?? [];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };
  const data: Product[] = await fetchData();
    return (
    <>
        <ProductData lng={lng} data={data} />
    </>
  )
}
