import { Outlet, NavLink } from 'react-router-dom'

const tabs = [
  { to: '/album', label: 'Álbum', icon: '📖' },
  { to: '/trocas', label: 'Trocas', icon: '🔄' },
  { to: '/home', label: 'Início', icon: '🏠' },
  { to: '/checklist', label: 'Lista', icon: '☑️' },
  { to: '/config', label: 'Config', icon: '⚙️' },
]

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen w-full max-w-md mx-auto bg-white">
      <main className="flex-1 w-full overflow-y-auto pb-20">
        <Outlet />
      </main>
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 flex">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center py-2 text-xs gap-0.5 ${
                isActive ? 'text-green-700 font-semibold' : 'text-gray-500'
              }`
            }
          >
            <span className="text-lg leading-none">{tab.icon}</span>
            {tab.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
