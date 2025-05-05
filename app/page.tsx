'use client'

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Header from "./components/Header";
import { works } from "./data/data";
import { useState, useRef, useEffect } from "react";
import Footer from "./components/Footer";
import Image from "next/image";

// Variants for the initial and visible delay states of the images
const imgVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: ({ index, parent }: { index: number; parent: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: 0.5 + parent * 0.35 + 0.5 + index * 0.25,
      ease: [0.7, 0, 0.84, 0], // Lista offset + 0.5s + img stagger
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

  const perspectiveValue = scrollDirection === 'down' ? 12 : scrollDirection === 'up' ? 12 : 0;
  const rotateValue = scrollDirection === 'down' ? 12 : scrollDirection === 'up' ? 12 : 0;
  const zValue = scrollDirection === 'down' ? -0.5 : scrollDirection === 'up' ? 0.5 : 0;

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
                    animate={{ perspective: perspectiveValue, rotateY: rotateValue, rotateZ: zValue }}
                    className={`col-span-2 size-full overflow-hidden ${i === 2 || i === 5 ? 'col-span-4 md:col-span-2' : 'col-span-2'}`}>
                    <motion.div
                      variants={imgVariants}
                      custom={{index:i , parent: parentI}}
                      animate='visible'
                      initial='hidden'
                      >
                      <Image 
                        src={`/images/${img}`} 
                        alt={img} 
                        width={1000} 
                        height={1000} 
                        priority
                        ></Image>
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
                    animate={{ perspective: perspectiveValue, rotateY: rotateValue, rotateZ: zValue }}
                    className={`col-span-2 size-full overflow-hidden ${i === 2 || i === 5 ? 'col-span-4 md:col-span-2' : 'col-span-2'}`}>
                    <motion.div
                      variants={imgVariants}
                      custom={{index:i , parent: parentI}}
                      animate='visible'
                      initial='hidden'
                      >
                      <Image 
                        src={`/images/${img}`} 
                        alt={img} 
                        width={1000} 
                        height={1000} 
                        priority
                        ></Image>
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
      <Footer></Footer>
    </main>
  );
}
