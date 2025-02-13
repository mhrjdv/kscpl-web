import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');

        try {
            const response = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('Message sent successfully!');
                setFormData({ name: '', phone: '', email: '', message: '' });
                toast.success('Message sent successfully!');
            } else {
                setStatus('Failed to send message.');
                toast.error('Failed to send message.');
            }
        } catch (error) {
            setStatus('Failed to send message.');
            toast.error('Failed to send message.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message" required />
            <button type="submit">Submit</button>
            {status && <p>{status}</p>}
        </form>
    );
};

export default ContactForm;
