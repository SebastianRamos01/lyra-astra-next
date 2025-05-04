'use client'

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Header from "./components/Header";
import { works } from "./data/data";
import { useState, useRef, useEffect } from "react";

// Variants for the initial and visible delay states of the images
const imgVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: ({ index, parent }: { index: number; parent: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5 + parent * 0.35 + 0.5 + index * 0.25, ease: [0.7, 0, 0.84, 0], // Lista offset + 0.5s + img stagger
    },
  }),
}

export default function Home() {

  const { scrollY } = useScroll();
  const [ scrollDirection, setScrollDirection ] = useState<"up" | "down" | "none">("none");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;

    if (diff > 0) {
      setScrollDirection("down");
    } else if (diff < 0) {
      setScrollDirection("up");
    }

    // Reset the timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setScrollDirection("none");
    }, 50);
  });

  useEffect(() => {
    return () => {
      // Clear the timeout when the component unmount
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  console.log(scrollDirection);

  const skewValue = scrollDirection === "down" ? 0.75 : scrollDirection === "up" ? -0.75 : 0
  const scaleValue = scrollDirection === "down" ? 0.98 : scrollDirection === "up" ? 0.98 : 1

  return (
    <main>
      <Header></Header>
      <section className="mx-5 md:mx-10 mt-20">
        <ul>
          {works.map((el, parentI) => (
            <li
              key={el.id}
              className="my-2">
              <h2 key={el.id} className="font-medium mb-3 text-xs">{el.title}</h2>
              <ul className="grid grid-cols-4 lg:grid-cols-16 gap-3">
                {el.images.map((img, i) => (
                  <motion.li
                    key={i}
                    animate={{ skewX: skewValue , scale: scaleValue}}
                    className={`col-span-2 size-full overflow-hidden ${i === 2 || i === 5 ? 'col-span-4 md:col-span-2' : 'col-span-2'}`}>
                    <motion.div
                      variants={imgVariants}
                      custom={{index:i , parent: parentI}}
                      animate='visible'
                      initial='hidden'
                      >
                      <img src={`/images/${img}`} alt={img} />
                    </motion.div>
                    <div className="text-xs font-medium">
                      0{i + 1}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <ul>
          {works.map((el, parentI) => (
            <li
              key={el.id}
              className="my-2">
              <h2 key={el.id} className="font-medium mb-3 text-xs">{el.title}</h2>
              <ul className="grid grid-cols-4 lg:grid-cols-16 gap-3">
                {el.images.map((img, i) => (
                  <motion.li
                    key={i}
                    animate={{ skewX: scrollDirection === "down" ? 1 : scrollDirection === "up" ? -1 : 0 }}
                    className={`col-span-2 size-full overflow-hidden ${i === 2 || i === 5 ? 'col-span-4 md:col-span-2' : 'col-span-2'}`}>
                    <motion.div
                      variants={imgVariants}
                      custom={{index:i , parent: parentI}}
                      animate='visible'
                      initial='hidden'
                      >
                      <img src={`/images/${img}`} alt={img} />
                    </motion.div>
                    <div className="text-xs font-medium">
                      0{i + 1}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        
      </section>
    </main>
  );
}
