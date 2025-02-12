import { cn } from '@/lib/utils';
import Link from 'next/link';

const ServiceCard = ({ service_name, designation, service_desc, text_muted, link }) => {
    return (
        <div className="px-10 pb-6 pt-2">
            { link ? (
                <Link href={link} className={cn(`text-primary-foreground font-bold text-xl hover-underline mt-10 ${text_muted}`)}>
                    <span>{service_name}</span>
                </Link>
            ) : (
                <span className={cn(`text-primary-foreground font-bold text-xl mt-10 ${text_muted}`)}>
                    {service_name}
                </span>
            )}
            <p className="text-primary-foreground text-sm mt-1 whitespace-nowrap overflow-hidden text-ellipsis">
                {designation}
            </p>
            <hr className="my-2 w-1/3 border-t-2 border-primary-foreground" />
            <p className={cn(`font-normal text-primary-foreground text-base mt-4`)}>{service_desc}</p>
        </div>
    )
}

export default ServiceCard