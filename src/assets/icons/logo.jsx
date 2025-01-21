import React from 'react';
import Image from 'next/image'; // Next.js optimized image component
import logo from '@/assets/icons/kscpl_logo.webp'; // Adjust path if necessary

const Logo = () => {
  return (
    <div>
      <Image src={logo} alt="KSCPL Logo" width={150} height={50} /> {/* Adjust dimensions */}
    </div>
  );
};

export default Logo;
