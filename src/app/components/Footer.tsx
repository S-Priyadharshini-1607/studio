import { Heart, Mail, MapPin, Phone, PhoneCall } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    Services: ['Photoshoot Type', 'Lifestyle Photoshoot', 'Event Photoshoot', 'Commercial Photoshoot'],
    Company: ['About Us', 'Portfolio', 'Blog', 'Contact'],
    Resources: ['Pricing Guide', 'FAQ', 'Client Gallery', 'Testimonials'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Copyright', 'License'],
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="text-2xl font-bold text-white mb-4">
              FocusStudio
            </div>
            <p className="text-sm mb-4 max-w-sm">
              Capturing your most precious memories with artistry and passion.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <a
                href="tel:8870378137"
                className="w-11 h-11 bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-600 transition-colors"
                aria-label="Call 8870378137"
              >
                <Phone size={18} />
              </a>
              <a
                href="mailto:focusstudiokp@gmail.com"
                className="w-11 h-11 bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-600 transition-colors"
                aria-label="Email focusstudiokp@gmail.com"
              >
                <Mail size={18} />
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=1+Floor%2C+Focus+Photography%2C+Near+GH%2C+Mandhaveli%2C+Kallakurichi+-+Kachirapalayam+Road%2C+Kallakurichi-606202%2C+Tamil+Nadu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-600 transition-colors"
                aria-label="Open location in Google Maps"
              >
                <MapPin size={18} />
              </a>
            </div>
            <p className="text-xs text-gray-400 max-w-xs">
              Tap the phone icon to call us, the email icon to send a message, or the map icon to open our location in Google Maps.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <button className="text-sm hover:text-white transition-colors">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-6 text-sm">
            <button className="hover:text-white transition-colors">Status</button>
            <button className="hover:text-white transition-colors">Changelog</button>
            <button className="hover:text-white transition-colors">Contact</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
