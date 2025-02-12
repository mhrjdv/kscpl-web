"use client";
import React, { useEffect, useState } from 'react';
import AssociationsPage from '../../../../components/section/associations/page';
import section_bg from "@/assets/images/section-bg.jpg";
import SectionTitle from '@/components/ui/sectionTitle';
import AssociateNames from '@/components/ui/cards/associateNames';

const Associations = () => {
  const [architects, setArchitects] = useState([]);
  const [consultants, setConsultants] = useState([]);

  useEffect(() => {
    fetch('https://kscplcms.cubeone.in/api/associations?populate=*')
      .then(response => response.json())
      .then(data => {
        const fetchedArchitects = data.data[0].associations.filter(({ Associations }) => Associations === 'Architects').map(({ id, Name }) => ({
          id,
          name: Name,
          association: Associations
        }));
        const fetchedConsultants = data.data[0].associations.filter(({ Associations }) => Associations === 'Consultants').map(({ id, Name }) => ({
          id,
          name: Name,
          association: Associations
        }));
        setArchitects(fetchedArchitects);
        setConsultants(fetchedConsultants);
      });
  }, []);

  return (
    <>
      <section className='bg-cover bg-no-repeat bg-center relative z-[1] after:content-[""] after:z-[-1] after:absolute after:left-0 after:top-0 after:w-full after:h-full after:bg-[#d2e0d9a6] pt-20 pb-30' style={{ backgroundImage: `url(${section_bg.src})` }}>
        <div className='container-fluid '>
          <SectionTitle sectionName={"Associations"} sectionTitle={"Associations"} sectionDesc={"We Collaborates with esteemed architects and consultants."} />
        </div>
      </section>
      {/* -------- service list */} 
      <div className='container-fluid lg:pt-20 2sm:pt-16 pt-10'>
        <div className='flex flex-wrap gap-8 px-4 2sm:px-0'>
          <div className='w-full lg:w-1/2 pl-10'>
            <h2 className="text-primary-foreground font-bold text-2xl mb-4 p-4">Architects</h2>
            <ul className='list-disc pl-5'>
              {
                architects.map(({ id, name, association }) => <li key={id}><AssociateNames name={name} association={association} /></li>)
              }
            </ul>
          </div>
          <div className='w-full lg:w-1/2 pl-10'>
            <h2 className="text-primary-foreground font-bold text-2xl mb-4 p-4">Consultants</h2>
            <ul className='list-disc pl-5'>
              {
                consultants.map(({ id, name, association }) => <li key={id}><AssociateNames name={name} association={association} /></li>)
              }
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Associations;
