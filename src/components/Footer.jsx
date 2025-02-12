import { useState } from "react";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";


const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {
      // Show success message using SweetAlert2
      Swal.fire({
        icon: "success",
        title: "Subscribed successfully!",
        text: `Thank you for subscribing with ${email}`,
        confirmButtonText: "OK",
      });
      setEmail('')
    } else {
      // Show error message if email is empty
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a valid email address!",
      });
    }
  };


  return (
    <footer className="bg-[#3f583a] text-white pt-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6 md:px-10">
        {/* About Section */}
        <div className="flex flex-col justify-between">
          <h2 className="text-4xl font-bold">
            Residence <span className="text-yellow-600">Hotel</span>
          </h2>
          <p className="mt-3 text-gray-300 font-mono">
            Caribbean Ct, Haymarket, Virginia (VA). Your trusted partner for
            Hotel solutions.
          </p>
          <p className="mt-3">
            <span className="font-semibold">Email:</span>{" "}
            parvesmosarof2@gmail.com
          </p>
          <p>
            <span className="font-semibold">Phone:</span> 01516502364
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-gray-300 hover:text-yellow-400">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-300 hover:text-yellow-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-300 hover:text-yellow-400">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-300 hover:text-yellow-400">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

        {/* Hotel Types Section */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-600">
            Other Hotel Types
          </h3>
          <ul className="mt-4 space-y-2 text-gray-300">
            {[
              {
                type: "Tourist",
                url: "https://www.tripadvisor.com/TravelersChoice-Hotels-cTop-g1",
              },
              { type: "Work", url: "https://www.marriott.com" },
              { type: "Student", url: "https://www.hostelworld.com" },
              { type: "Business", url: "https://www.hilton.com" },
              { type: "Family", url: "https://www.choicehotels.com" },
            ].map((item, index) => (
              <li key={index}>
                <a
                  href={item.url}
                  target="_blank" // Opens the link in a new tab
                  rel="noopener noreferrer"
                  className="hover:text-yellow-400 cursor-pointer"
                >
                  {item.type}
                </a>
              </li>
            ))}
          </ul>
        </div>




{/* Quick Links Section */}
<div>
  <h3 className="text-lg font-semibold text-yellow-600">Quick Links</h3>
  <ul className="mt-1 space-y-0 text-gray-300">
    {[
      { name: "Home", path: "/" },
      { name: "Rooms", path: "/rooms" },
      { name: "My Bookings", path: "/bookings" },
      { name: "About Us", path: "/about" },
      { name: "Contact Us", path: "/contact" },
    ].map((link, index) => (
      <li key={index}>
        <Link
          to={link.path}
          className="block p-2 hover:text-yellow-400 cursor-pointer"
        >
          {link.name}
        </Link>
      </li>
    ))}
  </ul>
</div>



        {/* Subscribe Section */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-600">
            Stay Updated
          </h3>
          <p className="mt-4 text-gray-300 font-mono">
            Subscribe to get the latest hotel updates, news, and offers.
          </p>
          <div className="mt-6">
            <input
        type="email"
        placeholder="Your email address"
        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-yellow-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleSubscribe}
        className="w-full mt-4 px-4 py-2 bg-yellow-700 text-white rounded-md hover:bg-yellow-600"
      >
        Subscribe Now
      </button>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-3 bg-black h-10 text-center text-gray-400">
        <p>
          © 2024{" "}
          <span className="text-yellow-600 font-semibold">
            Residential Hotel
          </span>
          . Made with ❤ by{" "}
          <a
            href="https://www.facebook.com/profile.php?id=100055235052516"
            className="text-blue-400 hover:underline"
          >
            Anamul Hauqe
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
