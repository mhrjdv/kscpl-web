import React from 'react'
import CartProductList from '@/components/section/cartProductList'

import CalclutCard from '@/components/ui/calclutCard'
import TitleCheckout from '@/components/ui/titleCheckout'

import { productData } from '@/lib/fackData/productData'
import ProductCard from '@/components/ui/cards/productCard'

const Cart = () => {
    return (
        <div className='container'>
            <div className='py-15'>
                <TitleCheckout size={"8.5xl"}>Cart</TitleCheckout>
            </div>
            <div className='grid 2xl:grid-cols-[auto_427px] grid-cols-1 gap-5 items-start'>
                <CartProductList />
                <CalclutCard title={"Cart Total"} />
            </div>

            <div className='pt-20 pb-20'>
                <span className='block w-full h-[1px] bg-border mt-[7px] mb-3'></span>
                <div className=' 2xl:mt-[70px] lg:mt-14 mt-10'>
                    <h3 className='text-4xl font-bold text-muted-foreground leading-[1.35]'>Customers also bought</h3>
                    <div className='grid lg:grid-cols-3 2sm:grid-cols-2 grid-cols-1 gap-7.5 2xl:mt-[70px] lg:mt-14 mt-10'>
                        {
                        productData.slice(0, 3).map(({ id, price, product_img, product_name, rating }) => <ProductCard key={id} id={id} price={price} product_img={product_img} product_name={product_name} rating={rating} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart