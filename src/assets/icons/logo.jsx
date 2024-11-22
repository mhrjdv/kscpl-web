import React from 'react';
import Image from 'next/image'; // Next.js optimized image component
import logo from '@/assets/icons/kscpl_logo.png'; // Adjust path if necessary

const Logo = () => {
  return (
    <div>
      <Image src={logo} alt="KSCPL Logo" width={200} height={100} /> {/* Adjust dimensions */}
    </div>
  );
};

export default Logo;
