"use client"
import React from 'react'
import {motion} from "framer-motion"
import { cardSlideAnimation } from '@/lib/utils'
import Image from 'next/image'

const SectionSidebarImg = ({ img, section_name, className, width = 500, height = 500 }) => {
    // Check if img is a string (URL) or an imported image object
    const isStaticImport = typeof img === 'object';

    return (
        <motion.div
            initial="offscreen"
            whileInView="onscreen"
            variants={cardSlideAnimation()}
            viewport={{ once: true, amount: 0.2 }}
            className={className}
        >
            <Image 
                src={img} 
                loading='lazy' 
                placeholder={isStaticImport ? 'blur' : undefined}
                width={width} 
                height={height} 
                alt={section_name}
            />
        </motion.div>
    )
}

export default SectionSidebarImg