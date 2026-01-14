"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Carousel } from "react-bootstrap";

export default function Hero() {
  return (
    <motion.section>
      <motion.div>
        <Carousel variant="light">
          <Carousel.Item className="relative">
            <img
              className="d-block w-100"
              src="https://placehold.co/1024x400/1e293b/f8fafc?text=Slide+1"
              alt="First slide"
            />
            <Carousel.Caption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                Welcome to My Portfolio
              </h1>
              <p className="mx-auto max-w-xl text-gray-300/95 drop-shadow">
                I’m a junior from New Orleans majoring in Software Engineering
                with a minor in Math. My interests include machine learning and
                full-stack web development.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="relative">
            <img
              className="d-block w-100"
              src="https://placehold.co/1024x400/1e293b/f8fafc?text=Slide+2"
              alt="Second slide"
            />
            <Carousel.Caption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                Experience & Leadership
              </h1>
              <p className="mx-auto max-w-xl text-gray-300/95 drop-shadow">
                I’ve worked as a data science intern at BASF, served as a
                supplemental instructor, and I’m currently the president of the
                Google Developer Student Club at LSU.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="relative">
            <img
              className="d-block w-100"
              src="https://placehold.co/1024x400/1e293b/f8fafc?text=Slide+3"
              alt="Third slide"
            />
            <Carousel.Caption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                Let's Connect
              </h1>
              <p className="mx-auto max-w-xl text-gray-300/95 drop-shadow">
                Feel free to explore my projects and experience, and don't
                hesitate to reach out!
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </motion.div>
    </motion.section>
  );
}
