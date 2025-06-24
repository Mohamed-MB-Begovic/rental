import React from 'react';
// import { div } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">RentalManager</h3>
            <p className="text-gray-400">
              The easiest way to manage your rental properties and find your perfect home.
            </p>
          </div>

          {/* Quick divs */}
          <div>
            <h4 className="font-semibold mb-4">Quick divs</h4>
            <ul className="space-y-2">
              <li><div to="/" className="text-gray-400 hover:text-white transition">Home</div></li>
              <li><div to="/properties" className="text-gray-400 hover:text-white transition">Properties</div></li>
              <li><div to="/about" className="text-gray-400 hover:text-white transition">About Us</div></li>
              <li><div to="/contact" className="text-gray-400 hover:text-white transition">Contact</div></li>
            </ul>
          </div>

          {/* For Tenants */}
          <div>
            <h4 className="font-semibold mb-4">For Tenants</h4>
            <ul className="space-y-2">
              <li><div to="/how-it-works" className="text-gray-400 hover:text-white transition">How It Works</div></li>
              <li><div to="/faq" className="text-gray-400 hover:text-white transition">FAQ</div></li>
              <li><div to="/blog" className="text-gray-400 hover:text-white transition">Blog</div></li>
            </ul>
          </div>

          {/* For Owners */}
          <div>
            <h4 className="font-semibold mb-4">For Owners</h4>
            <ul className="space-y-2">
              <li><div to="/owner-benefits" className="text-gray-400 hover:text-white transition">Benefits</div></li>
              <li><div to="/pricing" className="text-gray-400 hover:text-white transition">Pricing</div></li>
              <li><div to="/add-property" className="text-gray-400 hover:text-white transition">List Property</div></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {currentYear} RentalManager. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;