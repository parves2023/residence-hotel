const Footer = () => {
  return (
    <footer className="bg-[#5D6C5A] text-white pt-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6 md:px-10">
        {/* About Section */}
        <div className="flex flex-col justify-between">
          <h2 className="text-4xl font-bold">
            Residence <span className="text-yellow-300">Hotel</span>
          </h2>
          <p className="mt-3 text-gray-300">
            Caribbean Ct, Haymarket, Virginia (VA). Your trusted partner for
            Hotel solutions.
          </p>
          <p className="mt-3">
            <span className="font-semibold">Email:</span>{" "}
            support@Hotel.com
          </p>
          <p>
            <span className="font-semibold">Phone:</span> +1 800-555-1234
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
          <h3 className="text-lg font-semibold text-yellow-300">Hotel Types</h3>
          <ul className="mt-4 space-y-2 text-gray-300">
            {["Tourist ", "Work ", "Student ", "Business ", "Family "].map(
              (type, index) => (
                <li
                  key={index}
                  className="hover:text-yellow-400 cursor-pointer"
                >
                  {type}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-300">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-gray-300">
            {[
              " Application Process",
              "Required Documents",
              " Fees",
              " Status Check",
              "FAQs",
            ].map((link, index) => (
              <li key={index} className="hover:text-yellow-400 cursor-pointer">
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Subscribe Section */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-300">Stay Updated</h3>
          <p className="mt-4 text-gray-300">
            Subscribe to get the latest visa updates, news, and offers.
          </p>
          <div className="mt-6">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-yellow-500"
            />
            <button className="w-full mt-4 px-4 py-2 bg-yellow-700 text-white rounded-md hover:bg-yellow-600">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 bg-black h-16 text-center text-gray-400">
        <p>
          © 2024{" "}
          <span className="text-yellow-300 font-semibold">VisaPilot</span>. Made
          with ❤ by{" "}
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
