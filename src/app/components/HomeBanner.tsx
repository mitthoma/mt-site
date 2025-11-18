"use client";

// import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { Fragment } from 'react'
// import Satellite from './Satellite'
import Cube from './Cube'

export default function HomeBanner() {
  return (
    <Fragment>
      <div className="relative isolate overflow-hidden bg-[#131314]" style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
        <div
          aria-hidden="true"
          className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
        >
          <div className="bg-[#131314] opacity-20" />
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8 order-last lg:order-first">
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
            <h3 className="mt-6 text-xl leading-8 text-gray-300">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
              fugiat veniam occaecat fugiat aliqua.
            </h3>
            <div className="mt-10 flex items-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-[#131314] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm bg-[#131314] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                Get started
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-white">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32 order-first lg:order-last">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <Cube />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          animation: 'bounce 2s infinite'
        }}>
          <span style={{ color: '#70e6ff', fontSize: '0.9rem', fontWeight: '500' }}>Scroll</span>
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#70e6ff" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="7 13 12 18 17 13"></polyline>
            <polyline points="7 6 12 11 17 6"></polyline>
          </svg>
        </div>
      </div>

      {/* Keyframe animation for scroll indicator */}
      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(10px);
          }
        }
      `}</style>
    </Fragment>
  )
}
