'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from './ThemeProvider'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Resume', href: '/resume' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      setIsScrolled(currentScrollY > 10)
    }
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (!prefersReducedMotion) {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('system')
    else setTheme('light')
  }

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />
      case 'dark':
        return <Moon className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  // Calculate scroll-responsive spacing
  const getScrollProgress = () => {
    const maxScroll = 200 // Maximum scroll distance for full effect
    return Math.min(scrollY / maxScroll, 1)
  }

  const scrollProgress = getScrollProgress()
  
  // Calculate spacing for different sections
  const logoToNavGap = 48 - (scrollProgress * 32) // 48px to 16px (logo to nav)
  const navItemGap = 24 - (scrollProgress * 12) // 24px to 12px (between nav items)
  const navToThemeGap = 48 - (scrollProgress * 32) // 48px to 16px (nav to theme)

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-dark-900/80 backdrop-blur-md border-b border-gray-200 dark:border-dark-700'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={{
                hover: { 
                  scale: 1.1,
                  rotateY: 10,
                  rotateX: 5,
                  transition: { 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 10,
                    duration: 0.3 
                  }
                },
                tap: { 
                  scale: 0.95,
                  transition: { duration: 0.1 }
                }
              }}
              className="relative text-2xl font-bold gradient-text"
            >
              <motion.div
                className="absolute inset-0 rounded-lg bg-primary-50 dark:bg-primary-900/20 opacity-0"
                variants={{
                  hover: { 
                    opacity: 0.3,
                    scale: 1.2,
                    transition: { duration: 0.2 }
                  }
                }}
                style={{ 
                  transformOrigin: "center",
                  zIndex: -1
                }}
              />
              RH
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <motion.div 
            className="hidden md:flex items-center"
            style={{
              gap: `${navItemGap}px`,
              marginLeft: `${logoToNavGap}px`,
              marginRight: `${navToThemeGap}px`
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.5, 
                  ease: "easeOut" 
                }}
                className="relative"
              >
                <motion.div
                  whileHover="hover"
                  whileTap="tap"
                  variants={{
                    hover: { 
                      scale: 1.1,
                      rotateY: 5,
                      rotateX: 5,
                      transition: { 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 10,
                        duration: 0.3 
                      }
                    },
                    tap: { 
                      scale: 0.95,
                      transition: { duration: 0.1 }
                    }
                  }}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 block ${
                      pathname === item.href
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                    }`}
                  >
                    {item.name}
                    
                    {/* Magnetic hover effect background */}
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-primary-50 dark:bg-primary-900/20 opacity-0"
                      variants={{
                        hover: { 
                          opacity: 1,
                          scale: 1.1,
                          transition: { duration: 0.2 }
                        }
                      }}
                      style={{ 
                        transformOrigin: "center",
                        zIndex: -1
                      }}
                    />
                    
                    {/* Active page underline with morphing effect */}
                    {pathname === item.href && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400 rounded-full"
                        initial={false}
                        transition={{ 
                          type: 'spring', 
                          stiffness: 300, 
                          damping: 30,
                          duration: 0.4
                        }}
                      />
                    )}
                    
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center">
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors duration-300"
              aria-label="Toggle theme"
            >
              <motion.div
                key={theme}
                initial={{ scale: 0.8, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20,
                  duration: 0.5 
                }}
              >
                {getThemeIcon()}
              </motion.div>
            </motion.button>

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <motion.div
                key={isOpen ? 'close' : 'menu'}
                initial={{ rotate: -90, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20,
                  duration: 0.4 
                }}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-dark-700"
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.1, 
                    duration: 0.5, 
                    ease: "easeOut" 
                  }}
                  whileHover="hover"
                  whileTap="tap"
                  variants={{
                    hover: { 
                      scale: 1.05,
                      rotateY: 3,
                      transition: { 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 15,
                        duration: 0.3 
                      }
                    },
                    tap: { 
                      scale: 0.95,
                      transition: { duration: 0.1 }
                    }
                  }}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-300 relative ${
                      pathname === item.href
                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-dark-800'
                    }`}
                  >
                    {item.name}
                    
                    {/* Magnetic hover effect for mobile */}
                    <motion.div
                      className="absolute inset-0 rounded-md bg-primary-100 dark:bg-primary-800/30 opacity-0"
                      variants={{
                        hover: { 
                          opacity: 1,
                          scale: 1.05,
                          transition: { duration: 0.2 }
                        }
                      }}
                      style={{ 
                        transformOrigin: "center",
                        zIndex: -1
                      }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
