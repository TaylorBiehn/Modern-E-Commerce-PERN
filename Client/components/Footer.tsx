import React from 'react';
import { footerCategories, footerSections } from '@/app/data';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='bg-footerblack w-screen flex flex-col'>
      <div className='flex flex-col justify-center items-center border-b-[1px] border-b-silver mt-16 pb-16'>
        <div className='mx-4'>
          <p className='text-salmon font-semibold text-base tracking-wide'>BRAND DIRECTORY</p>
          {footerCategories.map((category) => (
            <div key={category.name} className='flex mt-5 flex-wrap items-center'>
              <p className='text-footergray font-semibold'>{category.name} :</p>
              {category.subcategories.map((subcategory) => (
                <div key={subcategory.name} className='flex'>
                  <Link
                    href={subcategory.subcatLink}
                    className='text-silver tracking-wide ml-2 hover:text-gray-300'
                  >
                    {subcategory.name}
                  </Link>
                  <span className='bg-silver w-[1px] ml-2 h-[20px]' />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className='relative flex flex-row pb-14 gap-10 flex-wrap border-b-[1px] justify-evenly border-b-silver'>
        {footerSections.map((section) => (
          <div key={section.sectionName} className='flex flex-col'>
            <p className='text-white mt-16 font-bold text-md tracking-wide mb-1'>
              {section.sectionName}
            </p>
            <span className='border-b-[1px] w-16 border-b-salmon mb-6' />
            <div className='gap-2 flex flex-col'>
              {section.items.map((item) => (
                <Link
                  href={item.link}
                  key={item.title}
                  className='text-silver hover:text-gray-400'
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className='w-full h-50 gap-2 flex flex-col items-center mt-4 mb-16 lg:mb-0'>
        <img
          height={50}
          src='https://codewithsadee.github.io/anon-ecommerce-website/assets/images/payment.png'
          alt='Supported payment methods'
          loading='lazy'
        />
        <p className='text-silver font-semibold tracking-[2px] lg:pb-0'>
          Copyright &copy; Anon All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;