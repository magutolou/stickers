import { Outlet, NavLink } from 'react-router-dom'

const tabs = [
  { to: '/album',     label: 'Álbum', icon: 'ti-book' },
  { to: '/home',      label: 'Início', icon: 'ti-home' },
  { to: '/checklist', label: 'Lista',  icon: 'ti-list-check' },
  { to: '/config',    label: 'Config', icon: 'ti-settings' },
]

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen w-full max-w-md mx-auto bg-[#f4f1eb] dark:bg-[#111111]">
      <main className="flex-1 w-full overflow-y-auto pb-20">
        <Outlet />
      </main>
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white dark:bg-[#1e1e1e] border-t border-gray-200 dark:border-[#333] flex">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center py-2 text-xs gap-0.5 ${
                isActive
                  ? 'text-green-700 dark:text-[#6db84a] font-semibold'
                  : 'text-gray-500 dark:text-[#555]'
              }`
            }
          >
            <i className={`ti ${tab.icon} text-lg leading-none`} />
            {tab.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
