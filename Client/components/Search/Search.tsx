import React, { useEffect, useState, useRef } from 'react'
import { HomeIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline'
import SearchProducts from './SearchProducts';
import { useParams } from "next/navigation"
import FilterSidebar from '@/components/FilterSidebar';
import categoryDataHandler from '@/app/api/mainCategory';
import Loading from '@/components/Loading';
import SearchMSidebar from '../Mobile-Interface/SearchMSidebar';
import searchProductHandler, { searchFilteredHandler } from '@/app/api/search';
interface categories{
    categoryid: number;
    name: string;
};
interface Color {
  colorid:number;
  name: string;
  colorname: string;
  colorclass: string;
}

interface Size {
  sizeid:number;
  name: string;
  sizename:string;
  instock: boolean;
}
interface ProductImage {
  imageid: number;
  imglink: string;
  imgalt: string;
}
  
  // Interface for products
interface Product {
  productid: number;
  title: string;
  category: string;
  price: string;
  discount: string;
  stars: number;
  isnew: boolean;
  issale: boolean;
  isdiscount: boolean;
  colors: Color[]; // assuming colors is an array of strings
  sizes: Size[];  // assuming sizes is an array of strings
  reviewCount: number;
  images: ProductImage;
}
const Search = () => {
    const categoryCapture = useParams();
    const specificCategory = String(categoryCapture.productName);
    const currDirectory = ['Search', specificCategory];
    const [loading, setloading] = useState(true);
    const productsData = useRef<Product[]>([]);
    const dataChecked = useRef(false);
    const [clear, setClear] = useState(false);
    const [isMenu, setIsMenu] = useState(false);

    const filterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      productsData.current = [];
      dataChecked.current = false;
      setloading(true);
      const formData = new FormData(e.currentTarget);
      const minPrice = String(formData.get('pricefrom') ?? '');
      const maxPrice = String(formData.get('priceto') ?? '');
      const rating = String(formData.get('rating') ?? '');

      const response = await searchFilteredHandler({
        productName: specificCategory,
        minPrice,
        maxPrice,
        rating,
      });
      switch (response.status) {
        case 200:
          productsData.current = response.data.data;
          dataChecked.current = true;
          setloading(false);
          break;
      }
    };

    const fetchData = async () => {
      if (productsData.current.length !== 0) productsData.current = [];
      if (!loading) setloading(true);
        const response = await searchProductHandler({ productName: specificCategory });
        switch (response.status) {
            case 200:
                if (response.data.data.length > 0) productsData.current = response.data.data;
                dataChecked.current = true;
                setloading(false);
                break;
            default:
                break;
        }
    };

    const toggleClear = () => {
      setClear((prev) => !prev);
    };

    useEffect(() => {
      void fetchData();
    }, [clear]);

    const formatedName = specificCategory.split('-').join(' ');
  return (
    <>
    <SearchMSidebar isMenu={isMenu} setIsMenu={setIsMenu} dataChecked={dataChecked.current} filterSubmit={filterSubmit} toggleClear={toggleClear} />
    <section className='flex flex-col gap-6'>
        {/* <CategoryBanner banners={filterOut[0]}/> */}
        <div className='flex items-center gap-5'>
            <HomeIcon width={35}/>
            {currDirectory.map((each,index)=>
            <div className='flex gap-5' key={index}>
                <ChevronDoubleRightIcon width={20}/>
                <p className='font-medium capitalize'>{each===specificCategory ? formatedName : each}</p>
            </div>
            )}
        </div>
        <button
        onClick={()=>setIsMenu(true)}
            className="rounded-full lg:hidden px-2 py-2 border-2 font-semibold text-md text-primary-600 whitespace-nowrap w-[200px] mx-auto text-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-500 hover:text-white">Filter Products</button>
        <section className='flex'>
            <div className='relative ml-4'>
            <FilterSidebar dataChecked={dataChecked.current} filterSubmit={filterSubmit} toggleClear={toggleClear} mobileMode={false}/>
            </div>
            <SearchProducts dataChecked={dataChecked.current} products={productsData.current} loading={loading}/>
        </section>
    </section>
    </>
  )
}

export default Search;