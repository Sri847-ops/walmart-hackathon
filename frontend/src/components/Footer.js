"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Leaf,
  Recycle,
  Heart,
  Send,
  ArrowRight,
  Shield,
  Truck,
  Award,
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, color: "hover:text-blue-600", bgColor: "hover:bg-blue-50" },
    { name: "Twitter", icon: Twitter, color: "hover:text-sky-500", bgColor: "hover:bg-sky-50" },
    { name: "Instagram", icon: Instagram, color: "hover:text-pink-600", bgColor: "hover:bg-pink-50" },
    { name: "LinkedIn", icon: Linkedin, color: "hover:text-blue-700", bgColor: "hover:bg-blue-50" },
    { name: "YouTube", icon: Youtube, color: "hover:text-red-600", bgColor: "hover:bg-red-50" },
  ];

  const quickLinks = ["About Us", "Our Mission", "Sustainability", "Careers", "Press", "Blog"];
  const customerService = ["Contact Us", "FAQ", "Shipping Info", "Returns", "Size Guide", "Track Order"];
  const policies = ["Privacy Policy", "Terms of Service", "Cookie Policy", "Refund Policy"];

  return (
    <footer className="relative bg-white border-t border-gray-100">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-blue-500 to-emerald-500"></div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-4">
                GreenMart
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Your trusted partner for sustainable living. We're committed to providing eco-friendly products that
                make a positive impact on our planet.
              </p>

              {/* Eco badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-full text-sm font-medium">
                  <Leaf className="w-4 h-4" />
                  <span>100% Eco</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-full text-sm font-medium">
                  <Recycle className="w-4 h-4" />
                  <span>Carbon Neutral</span>
                </div>
                <div className="flex items-center gap-2 bg-red-50 text-red-700 px-3 py-2 rounded-full text-sm font-medium">
                  <Heart className="w-4 h-4" />
                  <span>Ethically Made</span>
                </div>
              </div>
            </div>

            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600 hover:text-green-600 transition-colors duration-300 group">
                <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-green-50 transition-colors duration-300">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 hover:text-green-600 transition-colors duration-300 group">
                <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-green-50 transition-colors duration-300">
                  <Mail className="w-4 h-4" />
                </div>
                <span>hello@greenmart.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 hover:text-green-600 transition-colors duration-300 group">
                <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-green-50 transition-colors duration-300">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>123 Green Street, Eco City, EC 12345</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-6 relative">
              Quick Links
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-green-600 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-6 relative">
              Customer Service
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </h4>
            <ul className="space-y-3">
              {customerService.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-6 relative">
              Stay Updated
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </h4>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter for eco-tips, exclusive offers, and sustainable living inspiration.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="mb-6">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none focus:ring-4 focus:ring-green-100 transition-all duration-300"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 hover:scale-105"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              {isSubscribed && (
                <p className="text-green-600 text-sm mt-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block"></span>
                  Thank you for subscribing!
                </p>
              )}
            </form>

            {/* Social Media */}
            <div>
              <h5 className="text-sm font-semibold text-gray-800 mb-4">Follow Us</h5>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href="#"
                      className={`p-3 bg-gray-50 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg ${social.color} ${social.bgColor}`}
                      onMouseEnter={() => setHoveredSocial(social.name)}
                      onMouseLeave={() => setHoveredSocial(null)}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="flex items-center gap-3 text-gray-600 hover:text-green-600 transition-colors duration-300 group">
              <div className="p-3 bg-green-50 rounded-xl group-hover:bg-green-100 transition-colors duration-300">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <div className="font-semibold">Secure Payment</div>
                <div className="text-sm text-gray-500">SSL Protected</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors duration-300 group">
              <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors duration-300">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <div className="font-semibold">Free Shipping</div>
                <div className="text-sm text-gray-500">Orders over $50</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-colors duration-300 group">
              <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-colors duration-300">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="font-semibold">Quality Guarantee</div>
                <div className="text-sm text-gray-500">30-day returns</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-8 border-t border-gray-100">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-gray-600 text-center lg:text-left">
              <p>&copy; 2024 GreenMart. All rights reserved. Made with 💚 for a sustainable future.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {policies.map((policy, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-600 hover:text-green-600 transition-colors duration-300 text-sm"
                >
                  {policy}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer; 