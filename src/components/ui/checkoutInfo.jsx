"use client"
import React, { useState } from 'react'
import CheckoutForm from './checkoutForm'
import CalclutCard from './calclutCard'
import Modal from 'react-modal'

const CheckoutInfo = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({ "country": "" })
    const submitOrder = () => {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }


    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            zIndex: "100"
        },
    };


    return (
        <>
            <div className='grid lg:grid-cols-[auto_427px] gap-5 items-start pt-7.5' >
                <CheckoutForm customerInfo={customerInfo} setCustomerInfo={setCustomerInfo} />
                <CalclutCard title={"Your order"} isCheckout={true} submitOrder={submitOrder} setCustomerInfo={setCustomerInfo} customerInfo={customerInfo} />
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div onClick={closeModal} className='pb-3 font-bold text-end cursor-pointer'>Close</div>

                <h2 className='text-4xl text-center font-bold'>Thanks for Order</h2>
                <hr />
                <div className='mt-5'>
                    <p><span className='font-medium'>Name:</span> <span>{customerInfo.first_name} {customerInfo.first_name}</span></p>
                    <p><span className='font-medium'>Email:</span> <span>{customerInfo.email}</span></p>
                    <p><span className='font-medium'>Phone:</span> <span>{customerInfo.phone}</span></p>
                    <p><span className='font-medium'>Country:</span> <span>{customerInfo.country}</span></p>
                    <p><span className='font-medium'>House Number:</span> <span>{customerInfo.house_number}</span></p>
                    <p><span className='font-medium'>Apartment:</span> <span>{customerInfo.apartment}</span></p>
                    <p><span className='font-medium'>Company Name:</span> <span>{customerInfo.company_name}</span></p>
                    <p><span className='font-medium'>Postcode:</span> <span>{customerInfo.postcode}</span></p>
                    <p><span className='font-medium'>City:</span> <span>{customerInfo.city}</span></p>
                    <p><span className='font-medium'>Notes:</span> <span>{customerInfo.notes}</span></p>
                </div>
            </Modal>
        </>
    )
}

export default CheckoutInfo