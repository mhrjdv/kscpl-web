import Image from "next/image";
import AddressCard from "@/components/ui/cards/addressCard";
import SectionTitle from "@/components/ui/sectionTitle";
import { addressList } from "@/lib/fackData/addressList";
import InputFiled from "@/components/ui/inputFiled";
import TextAreaFiled from "@/components/ui/textAreaFiled";
import RightArrow from "@/assets/icons/rightArrow";
import from_img from "@/assets/images/contact-image.jpg";
import Feedback from "@/components/section/feedback";
import ButtonOutline from "@/components/ui/buttons/buttonOutline";

export const metadata = {
  title: "Kalpana Struct-Con -- Contact",
  description: "Kalpana Struct-Con is a next js and tailwind css website",
};

const Contact = () => {
  return (
    <>
      {/* ------ address and map start */}
      <section>
        <div className="container-fluid">
          <SectionTitle
            sectionName="Contact"
            sectionTitle="Let's Connect"
            sectionDesc="Reach out to bring your dream spaces to life."
          />
        </div>
        <div className="container lg:pt-30 2sm:pt-20 pt-14">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Address Cards */}
            <div className="grid grid-cols-1 gap-y-6 items-center">
              {addressList.map(({ address, company, country, email, phone }) => (
                <AddressCard
                  key={company}
                  address={address}
                  company={company}
                  country={country}
                  email={email}
                  phone={phone}
                />
              ))}
            </div>
            {/* Map */}
            <div className="w-full lg:sticky lg:top-20 z-[1] mt-16 lg:mt-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.9123492752556!2d72.99044307520516!3d19.067590982135336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c1445e555555%3A0x907b6d6a88982f93!2sKalpana%20Struct%20Con%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1732774388144!5m2!1sen!2sin"
                className="w-full h-full min-h-[392px]"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      {/* ------ address and map end */}

      {/* ------ contact form start */}
      <section>
        <div className="container-fluid">
          <SectionTitle
            sectionName="Inquiry"
            sectionTitle="Have a Project in your mind?"
            sectionDesc="Write us directly"
          />
        </div>
        <div className="container lg:pt-30 2sm:pt-20 pt-14">
          <div className="grid lg:grid-cols-2 gap-5">
            <Image
              src={from_img}
              loading="lazy"
              placeholder="blur"
              alt="contact-form"
              className="w-full h-auto"
            />
            <form>
              <InputFiled
                placeholderc="Your Name"
                type="text"
                className="mb-[13px]"
              />
              <div className="flex sm:flex-row flex-col gap-x-5">
                <InputFiled
                  placeholderc="Phone Number"
                  type="number"
                  className="mb-[13px]"
                />
                <InputFiled
                  placeholderc="Your Email"
                  type="email"
                  className="mb-[13px]"
                />
              </div>
              <TextAreaFiled
                placeholder="Type your message"
                className="min-h-[223px] mb-[13px]"
              />
              <div className="flex justify-end">
                <ButtonOutline>
                  Send message{" "}
                  <RightArrow height="22" width="35" />
                </ButtonOutline>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* ------ contact form end */}
      <Feedback />
    </>
  );
};

export default Contact;