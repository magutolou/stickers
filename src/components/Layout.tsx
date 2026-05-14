import { useEffect, useRef } from 'react'
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

const tabs = [
  { to: '/album',     label: 'Álbum',  icon: 'ti-book' },
  { to: '/camera',    label: 'Câmera', icon: 'ti-camera' },
  { to: '/home',      label: 'Início', icon: 'ti-home' },
  { to: '/checklist', label: 'Lista',  icon: 'ti-list-check' },
  { to: '/config',    label: 'Config', icon: 'ti-settings' },
]

const TAB_PATHS = tabs.map((t) => t.to)

const variants = {
  enter: (dir: number) => ({ x: dir >= 0 ? '100%' : '-100%' }),
  center: { x: 0 },
  exit:  (dir: number) => ({ x: dir >= 0 ? '-100%' : '100%' }),
}

export default function Layout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const touchStartX = useRef<number | null>(null)

  const currentIndex = Math.max(0, TAB_PATHS.findIndex((p) => pathname.startsWith(p)))
  const prevIndexRef = useRef<number>(currentIndex)
  const direction = currentIndex - prevIndexRef.current

  useEffect(() => {
    prevIndexRef.current = currentIndex
  }, [currentIndex])

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    touchStartX.current = null

    if (Math.abs(delta) < 50) return

    const idx = TAB_PATHS.findIndex((p) => pathname.startsWith(p))
    if (idx === -1) return

    if (delta > 0 && idx < TAB_PATHS.length - 1) {
      navigate(TAB_PATHS[idx + 1])
    } else if (delta < 0 && idx > 0) {
      navigate(TAB_PATHS[idx - 1])
    }
  }

  return (
    <div className="flex flex-col min-h-screen w-full max-w-md mx-auto bg-[#f8f8f6] dark:bg-[#111111]">
      <main
        className="flex-1 w-full relative overflow-hidden bg-[#f8f8f6] dark:bg-[#111111]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute inset-0 overflow-y-auto pb-20 bg-[#f8f8f6] dark:bg-[#111111]"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
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
