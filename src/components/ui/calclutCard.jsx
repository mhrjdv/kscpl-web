"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import PaymentImg from '@/assets/images/payment-card.png'
import { useSelector } from 'react-redux';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';

const CalclutCard = ({ title, isCheckout, submitOrder, customerInfo, setCustomerInfo }) => {
    const [shippingPrice, setShippingPrice] = useState(0)
    const [paymentMehod, setPaymentMehod] = useState("check-payments")
    const { products } = useSelector((state) => state.addToCart)
    const subTotal = (products.reduce((total, product) => total + product?.price * product?.quantity, 0)).toFixed(2);
    const totalPrice = (parseFloat(subTotal) + parseFloat(shippingPrice)).toFixed(2)

    useEffect(() => {
        if (isCheckout) {
            setCustomerInfo({ ...customerInfo, products, paymentMehod, totalPrice })
        }
    }, [products, paymentMehod, totalPrice])


    return (
        <div className='border border-primary px-5 pt-5 pb-7.5 sticky top-20'>
            <h4 className='font-bold text-2xl text-muted-foreground'>{title}</h4>
            {isCheckout && <div>
                <div className='pt-4 flex items-center justify-between'>
                    <h5 className='font-bold text-muted-foreground leading-[1.6]'>Products</h5>
                    <h5 className='font-bold text-muted-foreground leading-[1.6]'>Subtotal</h5>
                </div>
                <span className='block w-full h-[1px] bg-border mt-[7px] mb-3'></span>
                <ul className='flex flex-col gap-[18px]'>
                    {
                        products.map(({ id, price, product_name, quantity }) => {
                            const totalPrice = (price * quantity).toFixed(2)
                            return (
                                <li key={id} className='flex justify-between items-center'>
                                    <p className=' flex items-center gap-3'><span>{product_name}</span><span className='uppercase'>x {quantity}</span></p>
                                    <p className=''>${totalPrice}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>}
            <div>
                <span className='block w-full h-[1px] bg-border mt-[18px] mb-4'></span>
                <div className='flex items-center justify-between'>
                    <h5 className='font-bold text-muted-foreground'>Subtotal</h5>
                    <h5 className='font-bold '>${subTotal}</h5>
                </div>
                <span className='block w-full h-[1px] bg-border mt-[17px] mb-[18px]'></span>
            </div>
            <div className='flex items-start gap-9'>
                <h5 className='font-bold text-muted-foreground'>Shipping</h5>
                <div>
                    <RadioGroup onValueChange={setShippingPrice} defaultValue="0" className="gap-2.5">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="0" id="free-shipping" />
                            <Label htmlFor="free-shipping" className="text-lg font-normal ">Free Shipping</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="10" id="local-pickup" />
                            <Label htmlFor="local-pickup" className="text-lg font-normal ">Local Pickup: <span className='font-bold'>$10.00</span></Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="20" id="flat-rate" />
                            <Label htmlFor="flat-rate" className="text-lg font-normal ">Flat rate: <span className='font-bold'>$20.00</span></Label>
                        </div>
                    </RadioGroup>
                    <p className='font-medium  mt-2.5'>Shipping Options will be updated during checkout</p>
                </div>
            </div>
            <div>
                <span className='block w-full h-[1px] bg-border mt-[18px] mb-4'></span>
                <div className='flex items-center justify-between'>
                    <h5 className='font-bold text-muted-foreground'>Total</h5>
                    <h5 className='font-bold '>${totalPrice}</h5>
                </div>
            </div>
            {isCheckout && <div>
                <span className='block w-full h-[1px] bg-border mt-3 mb-4'></span>
                <RadioGroup onValueChange={setPaymentMehod} defaultValue="check-payments" className="gap-2.5">
                    <div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="check-payments" id="check-payments" />
                            <Label htmlFor="check-payments" className="text-lg font-normal ">Check payments</Label>
                        </div>
                        <p className=''>Please send a check to Store Name, Store Street, Store State, Store postcode.</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="paypal" id="paypal" />
                            <Label htmlFor="paypal">Paypal</Label>
                        </div>
                        <Image src={PaymentImg} width={124} height={43} alt='paypal' />
                    </div>
                </RadioGroup>
            </div>
            }
            <Button onClick={submitOrder} asChild className='mt-7.5 w-full cursor-pointer' size="lg">
                {isCheckout ?
                    <span>Place order</span>
                    :
                    <Link href={"/checkout"} >Proceed to checkout</Link>
                }
            </Button>
        </div>
    )
}

export default CalclutCard
