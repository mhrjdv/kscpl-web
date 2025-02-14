"use client";
import React, { useEffect, useState } from 'react';
import AssociationsPage from '../../../../components/section/associations/page';
import section_bg from "@/assets/images/section-bg.jpg";
import SectionTitle from '@/components/ui/sectionTitle';
import AssociateNames from '@/components/ui/cards/associateNames';
import PreLoading from "@/components/ui/preLoading"; // added import

const Associations = () => {
  const [architects, setArchitects] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true); // added loading state
  const [subTitle, setSubTitle] = useState("");

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
        setSubTitle(data.data[0].associationsSubTitle);
        setLoading(false); // finish loading
      })
      .catch(() => setLoading(false)); // handle error & finish loading
  }, []);

  // Render loader until page content is ready
  if (loading) return <PreLoading />;

  return (
    <>
      <section className='bg-cover bg-no-repeat bg-center relative z-[1] after:content-[""] after:z-[-1] after:absolute after:left-0 after:top-0 after:w-full after:h-full after:bg-[#d2e0d9a6] pb-20' style={{ backgroundImage: `url(${section_bg.src})` }}>
        <div className='container-fluid '>
          <SectionTitle sectionName={"Associations"} sectionTitle={"Associations"} sectionDesc={subTitle} />
        </div>
      </section>
      {/* -------- service list */} 
      <div className="container sm:py-15 py-0">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="mb-12 relative after:absolute sm:after:-left-10 after:-left-4 after:top-[calc(50%+50px)] after:-translate-y-1/2 after:w-[1px] sm:after:h-[100%] after:h-[80%] after:bg-primary sm:ml-10 ml-4 2sm:mt-[20px]">
            <h2 className="text-primary-foreground text-2xl font-bold mb-6">Architects</h2>
            <div className="text-primary-foreground sm:ml-10 ml-4">
              <ul className='list-disc pl-5'>
                {
                  architects.map(({ id, name, association }) => <li key={id}><AssociateNames name={name} association={association} /></li>)
                }
              </ul>
            </div>
          </div>
          <div className="mb-12 relative after:absolute sm:after:-left-10 after:-left-4 after:top-[calc(50%+50px)] after:-translate-y-1/2 after:w-[1px] sm:after:h-[100%] after:h-[80%] after:bg-primary sm:ml-10 ml-4 2sm:mt-[20px]">
            <h2 className="text-primary-foreground text-2xl font-bold mb-6">Consultants</h2>
            <div className="text-primary-foreground sm:ml-10 ml-4">
              <ul className='list-disc pl-5'>
                {
                  consultants.map(({ id, name, association }) => <li key={id}><AssociateNames name={name} association={association} /></li>)
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Associations;
