
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import CheckoutInfo from '@/components/ui/checkoutInfo'
import TitleCheckout from '@/components/ui/titleCheckout'



export const metadata = {
    title: "Kalpana Struct-Con -- Checkout",
    description: "Kalpana Struct-Con is a next js and tailwind css website",
};

const Checkout = () => {
    return (
        <>
            {/* ------ Checkout form start */}
            <section className='py-15'>
                <div className='container'>
                    <div>
                        <TitleCheckout size={"8.5xl"}>Checkout</TitleCheckout>
                        <ul className='mt-6 flex flex-col gap-2.5'>
                            <li className='text-muted-foreground'>Returning customer? <Link href={"#"} className='relative after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[1px] after:bg-primary'> <span className='text-foreground'>Click here to login</span> </Link> </li>
                        </ul>
                    </div>
                    <CheckoutInfo />
                </div>
            </section>
            {/* ------ Checkout form end */}
        </>
    )
}

export default Checkout