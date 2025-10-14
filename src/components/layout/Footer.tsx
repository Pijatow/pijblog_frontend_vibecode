export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary dark:bg-primary text-background dark:text-gray-300 mt-auto border-t-4 border-secondary/30">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-xl font-bold text-background dark:text-gray-100">PijBlog</span>
            </div>
            <div className="text-sm text-background/70 dark:text-gray-400">
              © {currentYear} PijBlog. All rights reserved.
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-8">
            <a
              href="#"
              className="text-background hover:text-accent transition-all duration-300 text-sm font-medium hover:scale-110 hover:drop-shadow-lg"
            >
              About
            </a>
            <a
              href="#"
              className="text-background hover:text-accent transition-all duration-300 text-sm font-medium hover:scale-110 hover:drop-shadow-lg"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-background hover:text-accent transition-all duration-300 text-sm font-medium hover:scale-110 hover:drop-shadow-lg"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-background hover:text-accent transition-all duration-300 text-sm font-medium hover:scale-110 hover:drop-shadow-lg"
            >
              Contact
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-background hover:bg-secondary hover:scale-110 transition-all duration-300 shadow-md hover:shadow-xl"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-background hover:bg-secondary hover:scale-110 transition-all duration-300 shadow-md hover:shadow-xl"
              aria-label="Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
