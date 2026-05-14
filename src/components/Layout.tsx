import { useRef } from 'react'
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'

const tabs = [
  { to: '/album',     label: 'Álbum',  icon: 'ti-book' },
  { to: '/camera',    label: 'Câmera', icon: 'ti-camera' },
  { to: '/home',      label: 'Início', icon: 'ti-home' },
  { to: '/checklist', label: 'Lista',  icon: 'ti-list-check' },
  { to: '/config',    label: 'Config', icon: 'ti-settings' },
]

const TAB_PATHS = tabs.map((t) => t.to)

export default function Layout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const touchStartX = useRef<number | null>(null)

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    touchStartX.current = null

    if (Math.abs(delta) < 50) return

    const currentIndex = TAB_PATHS.findIndex((p) => pathname.startsWith(p))
    if (currentIndex === -1) return

    if (delta > 0 && currentIndex < TAB_PATHS.length - 1) {
      navigate(TAB_PATHS[currentIndex + 1])
    } else if (delta < 0 && currentIndex > 0) {
      navigate(TAB_PATHS[currentIndex - 1])
    }
  }

  return (
    <div className="flex flex-col min-h-screen w-full max-w-md mx-auto bg-[#f8f8f6] dark:bg-[#111111]">
      <main
        className="flex-1 w-full overflow-y-auto pb-20 bg-[#f8f8f6] dark:bg-[#111111]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
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
