"use client"
import React from 'react'
import Image from 'next/image';
import { FaMinus, FaPlus } from "react-icons/fa6";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { dicrementProductQuentity, incrementProductQuentity, removeToCart } from '@/redux/addToCartSlice';

import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CartProductList = () => {
    const { products } = useSelector((state) => state.addToCart)
    const dispatch = useDispatch()
    return (
        <div>
            <Table className="min-w-[900px] xl:min-w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead className='text-xl font-bold text-muted-foreground max-w-72'>Products</TableHead>
                        <TableHead className='text-xl font-bold text-muted-foreground min-w-25'>Price</TableHead>
                        <TableHead className='text-xl font-bold text-muted-foreground min-w-40'>Quantity</TableHead>
                        <TableHead className='text-xl font-bold text-muted-foreground min-w-25'>Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        products.map(({ id, price, product_img, product_name, quantity }) => {
                            const totalPrice = (price * quantity).toFixed(2)

                            return (
                                <TableRow key={id} >
                                    <TableCell className="flex items-center gap-[34px] py-5 px-0 max-w-72">
                                        <Image src={product_img} width={100} height={120} alt='product' />
                                        <b className='text-xl font-bold text-muted-foreground'>{product_name}</b>
                                    </TableCell>
                                    <TableCell className='text-xl font-bold text-muted-foreground py-5 px-0'>${price}</TableCell>
                                    <TableCell className="py-5 px-0">
                                        <div className='max-w-[143px] border border-primary flex items-center gap-7.5 px-6 py-2 text-xl font-bold text-muted-foreground'>
                                            <FaPlus className='cursor-pointer font-bold' onClick={() => dispatch(incrementProductQuentity(id))} />
                                            {quantity}
                                            <FaMinus className='cursor-pointer font-bold' onClick={() => dispatch(dicrementProductQuentity(id))} />
                                        </div>
                                    </TableCell>
                                    <TableCell className='text-xl font-bold text-muted-foreground py-5 px-0'>${totalPrice}</TableCell>
                                    <TableCell className='text-xl text-muted-foreground cursor-pointer py-5 px-0' onClick={() => dispatch(removeToCart(id))}>(x)</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
            <div>
                <span className='block w-full h-[1px] bg-border'></span>
                <div className='max-w-[522px] flex items-center lg:gap-5 gap-3 mt-8'>
                    <Input type={"text"} placeholder={"Coupon code"} className={"border-secondary rounded-none lg:py-4 py-3 max-h-[62px] text-lg"} />
                    <Button>Apply coupon</Button>
                </div>
            </div>
        </div>
    )
}

export default CartProductList