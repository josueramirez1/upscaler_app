import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-background text-foreground border-t border-muted">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <img
            src={logo} // Updated to standard public folder path
            className="w-auto h-8  opacity-70 hover:opacity-100 transition-opacity"
            alt="Upscaler Logo"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 border-t border-gray-100 dark:border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:pt-16">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Product</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href="#features"
                  className="text-gray-600 transition hover:text-primary dark:text-gray-400"
                >
                  Kanban Boards
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-600 transition hover:text-primary dark:text-gray-400"
                >
                  Internal Inbox
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 transition hover:text-primary dark:text-gray-400"
                >
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Resources
            </p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-600 transition hover:text-primary dark:text-gray-400"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-600 transition hover:text-primary dark:text-gray-400"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-900 dark:text-white">Connect</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-600 transition hover:text-primary dark:text-gray-400"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 transition hover:text-primary dark:text-gray-400"
                >
                  Portfolio
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
                  className="text-gray-600 transition hover:text-primary dark:text-gray-400"
                >
                  Accessibility Statement
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 transition hover:text-primary dark:text-gray-400"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Upscaler. Built by [Your Name]. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
