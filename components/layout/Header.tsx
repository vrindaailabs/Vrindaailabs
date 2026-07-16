export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

        <div>
          <h1 className="text-2xl font-bold">Vrinda AI Labs</h1>
          <p className="text-sm text-gray-500">
            Intelligence that Works
          </p>
        </div>

        <nav className="flex gap-8 text-sm font-medium">
          <a href="#">Solutions</a>
          <a href="#">Products</a>
          <a href="#">Industries</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>

      </div>
    </header>
  );
}