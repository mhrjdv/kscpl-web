import { cn } from '@/lib/utils';
import Link from 'next/link';

const ServiceCard = ({ service_name, designation, service_desc, text_muted, link }) => {
    return (
        <div className="px-10">
            { link ? (
                <Link href={link} className={cn(`text-primary-foreground font-bold text-xl hover-underline ${text_muted}`)}>
                    <span>{service_name}</span>
                </Link>
            ) : (
                <span className={cn(`text-primary-foreground font-bold text-xl ${text_muted}`)}>
                    {service_name}
                </span>
            )}
            <p className="text-primary-foreground text-lg mt-1">{designation}</p>
            <p className={cn(`font-normal text-primary-foreground text-base`)}>{service_desc}</p>
        </div>
    )
}

export default ServiceCard