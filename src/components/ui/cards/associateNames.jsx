import Associations from '@/app/(group1)/about-us/associations/page';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const AssociateNames = ({ name, association }) => {
    return (
        <div className="px-10">
            <span className="text-primary-foreground font-bold text-xl">
                {name}
            </span>
            <p className="text-primary-foreground text-lg mt-1">{association}</p>
        </div>
    )
}

export default AssociateNames