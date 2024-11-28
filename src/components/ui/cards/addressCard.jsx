"use client"
import Title from '../title'
import OutlineSvgText from '../outlineSvgText'
import Link from 'next/link'

const AddressCard = ({ id, address, company, country, email, phone }) => {
    return (
        <div className='-mt-6 lg:-mt-0'>
            {/* <OutlineSvgText text={id} /> */}
            <Title title_text={country} className="mb-1" />
            <div>
                <p className='font-semibold'>{company}</p>
                <p className='max-w-64'>{address}</p>
            </div>
            <div className='mt-5 mb-7.5'>
                <Link href={`tel:${phone}`} className='hover-underline block mb-2'>
                    <b className='font-normal'>Phone: </b><span>{phone}</span>
                </Link>
                <Link href={`mailto:${email}`} className='hover-underline block'>
                    <b className='font-normal'>Email: </b><span>{email}</span>
                </Link>
            </div>
            <Link href="https://maps.app.goo.gl/g7LXTMwgGqy6RjDo9" target="_blank" className='inline-flex items-center gap-3 text-xl font-bold cursor-pointer relative after:contents=[""] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-primary'>
                View on Map
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="21" viewBox="0 0 35 21" fill="none">
                    <path d="M24 19.5L33 10.4999L24 1.5" stroke="#253B2F" strokeWidth="2" strokeLinecap="square" />
                    <path d="M1 10.5L32 10.5" stroke="#253B2F" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
                </svg>
            </Link>
        </div>
    )
}

export default AddressCard