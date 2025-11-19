// import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { Fragment } from 'react'
import Satellite from './Satellite'

export default function AboutSection() {
  return (
    <Fragment>
        <div className="relative isolate overflow-hidden bg-[black] px-6 pb-24 sm:py-32 lg:overflow-visible lg:px-0 ">
            <div className="mt-24"></div>
            <div className="absolute inset-0 -z-10 overflow-hidden">
                {/* <svg
                aria-hidden="true"
                className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
                >
                <defs>
                    <pattern
                    x="50%"
                    y={-1}
                    id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                    width={200}
                    height={200}
                    patternUnits="userSpaceOnUse"
                    >
                    <path d="M100 200V.5M.5 .5H200" fill="none" />
                    </pattern>
                </defs>
                <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                    <path
                    d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                    strokeWidth={0}
                    />
                </svg>
                <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
                </svg> */}
            </div>
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                <div className="lg:pr-4">
                    <div className="lg:max-w-lg">
                    <p className="text-sm md:text-base font-semibold leading-7 text-white" style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.3)', paddingBottom: '0.5rem', display: 'inline-block' }}>Senior Full Stack Software Engineer</p>
                    <h1 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-white sm:text-4xl">7+ Years of Experience</h1>
                    <p className="mt-6 text-base md:text-xl leading-6 md:leading-8 text-gray-300">
                        Architecting scalable full-stack solutions from concept to deployment. Specializing in cloud infrastructure, modern web frameworks, and AI-powered applications.
                    </p>
                    </div>
                </div>
                </div>
                {/* adjust lg:top-[x] value here to adjust where the below container freeze point is on scroll  */}
                <div className="mx-auto md:mx-0 p-4 md:-ml-12 md:p-12 lg:sticky lg:top-80 lg:col-start-2 lg:row-span-2 lg:row-start-1 overflow-visible mt-8 md:mt-24 mb-8 md:mb-48">
                {/* <Image
                    width="100"
                    height="100"
                    alt=""
                    src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
                    className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                /> */}
                <div className="proxz-nav proxz-nav__system">
                  <Satellite />
                </div>
                </div>
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                <div className="lg:pr-4">
                    <div className="max-w-xl text-base leading-7 text-gray-300 lg:max-w-lg">
                    
                    {/* Tech Stack */}
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white" style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.3)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Tech Stack</h2>
                    <div className="space-y-4 mb-12">
                        <div>
                            <h3 className="font-semibold text-white mb-2">Languages & Frameworks</h3>
                            <div className="flex flex-wrap gap-2">
                                {['JavaScript', 'TypeScript', 'Python', 'Vue', 'Nuxt', 'React', 'Next.js', 'Node.js', 'Express', 'SQL', 'MongoDB', 'Redis'].map((tech) => (
                                    <span key={tech} className="px-3 py-1 bg-white bg-opacity-10 border border-white border-opacity-30 text-sm text-white" style={{ borderRadius: '10px' }}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-2">Tools & DevOps</h3>
                            <div className="flex flex-wrap gap-2">
                                {['Git', 'Docker', 'AWS', 'CI/CD', 'Jest', 'Smart Contracts', 'Microservices'].map((tech) => (
                                    <span key={tech} className="px-3 py-1 bg-white bg-opacity-10 border border-white border-opacity-30 text-sm text-white" style={{ borderRadius: '10px' }}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Projects */}
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white" style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.3)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Featured Projects</h2>
                    <div className="space-y-6 mb-12">
                        <div className="p-4 border border-white border-opacity-20 hover:border-opacity-40 transition-all" style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px' }}>
                            <h3 className="font-bold text-white text-lg mb-2">Kickstarter Blockchain Clone</h3>
                            <p className="text-gray-300 mb-3">
                                Blockchain-powered crowdfunding platform with smart contracts enabling contributor voting on fund distributions.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {['React', 'Solidity', 'Ethereum', 'Next.js', 'Truffle'].map((tech) => (
                                    <span key={tech} className="px-2 py-1 text-xs bg-white bg-opacity-10 border border-white border-opacity-20 text-gray-300" style={{ borderRadius: '10px' }}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <a href="https://github.com/yourusername/kickstarter-blockchain" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                                View on GitHub
                            </a>
                        </div>
                        <div className="p-4 border border-white border-opacity-20 hover:border-opacity-40 transition-all" style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px' }}>
                            <h3 className="font-bold text-white text-lg mb-2">Developer Meetup Platform</h3>
                            <p className="text-gray-300 mb-3">
                                Web community where developers can schedule meetups based around various chosen topics.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {['React', 'Node.js', 'MongoDB', 'Express'].map((tech) => (
                                    <span key={tech} className="px-2 py-1 text-xs bg-white bg-opacity-10 border border-white border-opacity-20 text-gray-300" style={{ borderRadius: '10px' }}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <a href="https://github.com/yourusername/developer-meetup" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                                View on GitHub
                            </a>
                        </div>
                    </div>

                    {/* Publications */}
                    <h2 className="text-2xl font-bold tracking-tight text-white" style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.3)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Publications</h2>
                    <div className="space-y-3">
                        {[
                            { title: 'Comparing SVM and MLP Machine Learning Models', date: '3/20/2019' },
                            { title: 'Deep Learning with COVID-19 X-Ray CNN', date: '3/20/2020' },
                            { title: 'Benefits of Decentralized Cloud Storage', date: '4/6/2021' },
                            { title: 'Simple Example of Deploying a Smart Contract', date: '4/23/2021' },
                            { title: 'The Groundbreaking Bridge Between Real World Data And Smart Contracts', date: '10/13/2021' },
                            { title: 'IPFS: The Web3 Data Storage Revolution', date: '10/25/2022' }
                        ].map((pub, index) => (
                            <div key={index} className="pb-3 border-b border-white border-opacity-10 last:border-0">
                                <h3 className="font-semibold text-white text-sm">{pub.title}</h3>
                                <p className="text-xs text-gray-400 mt-1">{pub.date} • Becoming Human: AI Magazine</p>
                            </div>
                        ))}
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>

    </Fragment>
   
  )
}
