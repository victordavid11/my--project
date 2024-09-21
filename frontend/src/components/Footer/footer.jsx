import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="">
        <div className="fd">
          <div>
            <h3 className="text-xl font-bold mb-4">David's Desserts</h3>
            <p className="mb-2 flex items-center">
              <MapPin size={18} className="mr-2" />
              123 Tasty Street, Foodville, FC 12345
            </p>
            <p className="mb-2 flex items-center">
              <Phone size={18} className="mr-2" />
              (555) 123-4567
            </p>
            <p className="mb-2 flex items-center">
              <Mail size={18} className="mr-2" />
              info@gourmetdelights.com
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Hours</h3>
            <p className="mb-2 flex items-center">
              <Clock size={18} className="mr-2" />
              Mon - Fri: 11:00 AM - 10:00 PM
            </p>
            <p className="mb-2 flex items-center">
              <Clock size={18} className="mr-2" />
              Sat - Sun: 10:00 AM - 11:00 PM
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-blue-400">
                <Facebook size={24} />
              </a>
              <a href="https://instagram.com" className="hover:text-pink-400">
                <Instagram size={24} />
              </a>
              <a href="https://twitter.com" className="hover:text-blue-300">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className='mb-0'>&copy; 2024 David's Desserts All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;