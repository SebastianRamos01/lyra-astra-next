export default function Header() {
  return (
    <header className="px-5 md:px-10 text-xs h-16 w-full fixed top-0 z-10">
        <div className="flex justify-between items-center h-full">
            <h1 className="font-medium">
                Lyra Astra
            </h1>
            <div>
                <div className="font-medium">
                    Adquisitions:
                </div>
                <ul className="flex gap-3 text-sm font-medium">
                    <li>Instagram</li>
                    <li>Twitter</li>
                    <li>Email</li>
                </ul>
            </div>
        </div>
    </header>
  )
}
