const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <img
            src="../public/upscaler-logo.png"
            className="w-auto h-10"
            alt=""
          />
        </div>

        <div className="grid grid-cols-1 gap-8 border-t border-gray-100 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:pt-16 ">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Services & Features
            </p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-white"
                >
                  {" "}
                  Email Hub{" "}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-white"
                >
                  {" "}
                  Kanban Board{" "}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-white"
                >
                  {" "}
                  Mentor Coaching{" "}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-white"
                >
                  {" "}
                  HR Consulting{" "}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-900 dark:text-white">Company</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-white"
                >
                  {" "}
                  About{" "}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-white"
                >
                  {" "}
                  Meet the Team{" "}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-white"
                >
                  {" "}
                  Accounts Review{" "}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Helpful Links
            </p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-white"
                >
                  {" "}
                  Contact{" "}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-white"
                >
                  {" "}
                  FAQs{" "}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-white"
                >
                  {" "}
                  Live Chat{" "}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-900 dark:text-white">Legal</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-700 dark:text-white transition hover:opacity-75"
                >
                  {" "}
                  Accessibility{" "}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-700 dark:text-white transition hover:opacity-75"
                >
                  {" "}
                  Product Usage Policy{" "}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-700 dark:text-white transition hover:opacity-75"
                >
                  {" "}
                  Refund Policy{" "}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-xs text-gray-500 dark:text-white">
          © 2026. Upscaler. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
