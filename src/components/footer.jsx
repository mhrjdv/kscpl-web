import Link from "next/link";
import Logo from "@/assets/icons/logo";
import SocialMediaList from "./ui/socialMediaList";

const Footer = () => {
  return (
    <footer className=" container-fluid  mx-auto ">
      <div className=" bg-secondary ">
        <div className="container">
          <div className="grid lg:grid-cols-3 grid-cols-1 items-center pt-[100px] pb-20">
            <div>
              <Link
                href={""}
                className="text-primary-foreground"
              >
                <Logo
                  height={"30"}
                  width={"218"}
                />
              </Link>
              <h5 className="xl:text-2xl text-xl font-semibold text-primary-foreground leading-160 pt-2.5 pb-3">
                Our Work Speaks!
              </h5>
              <SocialMediaList />
            </div>
            <div className="mt-12 lg:mt-0 flex gap-x-10">
              <span className="h-[250px] w-[1px] bg-primary block my-2.5"></span>
              <div>
                <h5 className="text-2xl font-extrabold block text-primary-foreground leading-160 ">
                  Quick Links
                </h5>
                <span className="w-[99px] h-[1px] bg-primary block my-2.5"></span>
                <div className="">
                  
                                <ul className="flex flex-col gap-4"> {/* Changed to flex-col and adjusted gap */}
                  <li>
                    <Link
                      href=""
                      className='font-semibold text-lg block text-primary-foreground hover-underline' // Removed the divider styling
                    >
                      <span>News & Updates</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href=""
                      className='font-semibold text-lg block text-primary-foreground hover-underline'
                    >
                      <span>Construction</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href=""
                      className='font-semibold text-lg block text-primary-foreground hover-underline'
                    >
                      <span>Realty</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href=""
                      className='font-semibold text-lg block text-primary-foreground hover-underline'
                    >
                      <span>About Us</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href=""
                      className='font-semibold text-lg block text-primary-foreground hover-underline'
                    >
                      <span>Contact</span>
                    </Link>
                  </li>
                 
                </ul>
                </div>
                
              </div>
            </div>
            <div className="mt-12 lg:mt-0 flex gap-x-10">
              <span className="h-[280px] w-[1px] bg-primary block my-2.5"></span>
              <div>
                <h5 className="text-2xl font-extrabold inline-block text-primary-foreground leading-160 ">
                  Address
                </h5>
                <span className="w-[99px] h-[1px] bg-primary block my-2.5"></span>
                <div className="mt-[18px]">
                  <p className="text-xl font-bold text-primary-foreground">
                    Kalpana Struct-Con Pvt. Ltd.
                  </p>
                  <p className="text-lg text-primary-foreground">
                    Regd. Off.: Cyber One,
                    1006-1008 10th floor,Plot no.
                    4+6, Sector-30A, Vashi
                  </p>
                  <p className="text-lg text-primary-foreground">
                    Navi Mumbai - 400 703
                  </p>
                </div>
                <div className="mt-[17px]">
                  <Link
                    href={"tel:+912227814848"}
                    className="text-lg block text-primary-foreground hover-underline"
                  >
                    Phone:{" "}
                    <span>+91-22 2781 4848 / 4847</span>
                  </Link>
                  <Link
                    href={"tel:+912227814846"}
                    className="text-lg block text-primary-foreground hover-underline"
                  >
                    Fax:{" "}
                    <span>+91-22 2781 4846</span>
                  </Link>
                  <Link
                    href={
                      "mailto:info@kscpl.com"
                    }
                    className="text-lg block text-primary-foreground hover-underline"
                  >
                    Email:{" "}
                    <span>info@kscpl.com</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <hr className="bg-pritext-primary-foreground" />
          <div className="py-8 lg:flex justify-between items-center">
            <span className="text-sm text-primary-foreground block">
              Developed by{" "}
              <Link
                href={
                  "https://www.futurescapeadvertising.com/"
                }
              >
                Futurescape Advertising
              </Link>{" "}
            </span>
            <span className="text-sm text-primary-foreground block mt-3 lg:mt-0">
              ©{new Date().getFullYear()} Kalpana
              Struct-Con Pvt. Ltd. All Rights
              Reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
