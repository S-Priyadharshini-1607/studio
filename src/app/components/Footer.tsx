import { Heart } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    Services: ['Wedding Photography', 'Engagement Sessions', 'Albums', 'Packages'],
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
            <p className="text-sm mb-6">
              Capturing your most precious memories with artistry and passion.
            </p>
            <div className="flex gap-3">
              {['𝕏', 'in', 'f', '📷'].map((icon, index) => (
                <button
                  key={index}
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors text-sm"
                >
                  {icon}
                </button>
              ))}
            </div>
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
          <p className="text-sm flex items-center gap-2">
            © 2026 FocusStudio. Made with <Heart size={16} className="text-red-500 fill-red-500" /> in San Francisco
          </p>
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
