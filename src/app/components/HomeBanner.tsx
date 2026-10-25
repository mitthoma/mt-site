"use client";

// import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { Fragment } from 'react'
// import Satellite from './Satellite'
import Cube from './Cube'
import GlitchText from './GlitchText'
import { AnimatedBorderLink } from './AnimatedBorder'

export default function HomeBanner() {
  return (
    <Fragment>
      <div className="relative isolate overflow-hidden bg-[#131314]" style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          aria-hidden="true"
          className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
        >
          <div className="bg-[#131314] opacity-20" />
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl order-first lg:order-first">
            <div className="mt-24 sm:mt-32 lg:mt-16">
              {/* <a href="#" className="inline-flex space-x-6">
                <span className="rounded-full bg-[#131314] px-3 py-1 text-sm font-semibold leading-6 text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                  Senior Full Stack Engineer
                </span>
                <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-300">
                  <span>Just shipped v1.0</span>
                </span>
              </a> */}
            </div>
            {/* <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl font-[family-name:var(--font-bbh-sans)]">
              Mitchell Thomas
            </h1> */}
            <p className="text-sm md:text-base font-semibold tracking-wide text-gray-400 px-4 md:px-0 font-[family-name:var(--font-tomorrow)]">
              mitchell@localhost:~$ whoami
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-6xl px-4 md:px-0">
              Mitchell Thomas
            </h1>
            <p className="mt-4 text-lg md:text-2xl leading-7 md:leading-9 text-gray-200 px-4 md:px-0">
              Senior Full-Stack &amp; AI Engineer — agentic systems, LLM integration, regulated industries.
            </p>
            <p className="mt-3 text-base md:text-lg leading-6 md:leading-8 text-gray-400 px-4 md:px-0">
              8 years shipping full-stack products. Now building agent systems that replace real business processes.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 px-4 md:px-0">
              <AnimatedBorderLink href="#work" external={false} variant="solid" className="mc-lg" index="→">See the work</AnimatedBorderLink>
              <AnimatedBorderLink href="https://github.com/mitthoma" variant="quiet" className="mc-lg">GitHub</AnimatedBorderLink>
              <AnimatedBorderLink href="https://linkedin.com/in/mitchellthecoder" variant="quiet" className="mc-lg">LinkedIn</AnimatedBorderLink>
            </div>
            <blockquote className="mt-10 text-sm md:text-base leading-6 text-gray-500 px-4 md:px-0">
              <GlitchText trigger="continuous" interval={4500} speed={50}>
                Computer science is no more about computers than astronomy is about telescopes.
              </GlitchText>
              <cite className="mt-1 block not-italic">— Edsger Dijkstra</cite>
            </blockquote>
            {/* <div className="mt-10 flex items-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-[#131314] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm bg-[#131314] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                Get started
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-white">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div> */}
          </div>
          <div className="mx-auto mt-24 md:mt-16 flex justify-center max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none lg:justify-start xl:ml-32 order-last lg:order-last">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <Cube />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mc-scroll" aria-hidden="true">
          <span>Scroll</span>
          <i />
        </div>
      </div>

    </Fragment>
  )
}
