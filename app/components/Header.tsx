import { motion } from "motion/react"

const titleVariants = {
    hidden: { y: 24, opacity: 0},
    visible: (i: number) => ({
        y: 0,
        opacity: 1,
        transition: {
          delay: 0.2 + i * 0.1,
          duration: 0.3,
          ease: [0.11, 0, 0.5, 0],
        },
      }),
}

export default function Header() {

    const mainTitle = 'Lyra Astra'
    const letters = mainTitle.split('')

  return (
    <header className="px-5 md:px-10 text-xs h-16 w-full fixed top-0 z-10 mix-blend-difference text-white">
        <div className="flex justify-between items-center h-full">
            <h1 className="text-2xl font-semibold overflow-hidden flex">
                {letters.map((letter, i) => (
                    <motion.p
                    key={i}
                    variants={titleVariants}
                    custom={i}
                    initial='hidden'
                    animate='visible'
                    className={`uppercase ${letter === ' ' ? 'mr-2' : 'mr-[0.5px]'}`}>
                        {letter}
                    </motion.p>
                ))}
            </h1>
            <div>
                <div className="">
                    Adquisitions:
                </div>
                <ul className="flex gap-3 text-sm">
                    <li>Instagram</li>
                    <li>Twitter</li>
                    <li>Email</li>
                </ul>
            </div>
        </div>
    </header>
  )
}
