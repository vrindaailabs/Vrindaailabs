export default function Footer() {

  return (

    <footer className="bg-slate-950 py-16 text-gray-300">

      <div className="mx-auto grid max-w-7xl gap-12 px-8 md:grid-cols-4">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Vrinda AI Labs
          </h2>

          <p className="mt-4">
            Intelligence that Works
          </p>

        </div>

        <div>

          <h3 className="font-semibold text-white">
            Company
          </h3>

          <ul className="mt-4 space-y-2">

            <li>About</li>

            <li>Careers</li>

            <li>Contact</li>

          </ul>

        </div>

        <div>

          <h3 className="font-semibold text-white">
            Services
          </h3>

          <ul className="mt-4 space-y-2">

            <li>AI Automation</li>

            <li>Software Development</li>

            <li>Cloud Solutions</li>

          </ul>

        </div>

        <div>

          <h3 className="font-semibold text-white">
            Products
          </h3>

          <ul className="mt-4 space-y-2">

            <li>AI HR</li>

            <li>AI Finance</li>

            <li>Business AI Assistant</li>

          </ul>

        </div>

      </div>

      <div className="mt-16 border-t border-slate-800 pt-8 text-center text-sm">

        © 2026 Vrinda AI Labs. All Rights Reserved.

      </div>

    </footer>

  );

}