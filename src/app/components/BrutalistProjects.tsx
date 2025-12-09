"use client";

import { useState } from 'react';
import MiniTerminal from './MiniTerminal';

export default function BrutalistProjects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projectCodeSnippets: { [key: number]: string[] } = {
    1: [ // BlackBox - IPFS Blockchain Storage
      "$ ipfs init",
      "[+] Initializing IPFS node...",
      "[+] Peer identity: QmXy7...",
      "",
      "$ truffle compile",
      "Compiling DStorage.sol...",
      "[+] Contract compiled successfully",
      "",
      "$ ipfs.add(buffer)",
      "[+] File uploaded to IPFS",
      "Hash: QmT4Am...",
      "",
      "$ contract.methods.uploadFile()",
      "[+] Storing hash on blockchain",
      "[+] Transaction confirmed",
      "[+] Decentralized storage complete"
    ],
    2: [ // Chainfund - Crowdfunding Platform
      "$ truffle migrate --network rinkeby",
      "Deploying Campaign.sol...",
      "[+] Contract deployed",
      "",
      "$ web3.eth.getBalance(address)",
      "Balance: 15.5 ETH",
      "",
      "function createCampaign() {",
      "  Campaign campaign = new Campaign();",
      "  campaigns.push(campaign);",
      "}",
      "",
      "$ campaign.contribute({value: 1e18})",
      "[+] Contribution received",
      "[+] Backer count: 127"
    ],
    3: [ // Chiropractic Admin Panel
      "$ npm run dev",
      "[+] Nuxt server starting...",
      "[+] Prisma connected to PostgreSQL",
      "",
      "async function addPatient() {",
      "  const patient = await prisma.patient",
      "    .create({",
      "      data: { name, records }",
      "    });",
      "}",
      "",
      "$ firebase deploy",
      "[+] Deploying to Firebase...",
      "[+] Upload complete",
      "[+] Admin panel live"
    ],
    4: [ // Dev Meetup - Vue Social Platform
      "$ vue create dev-meetup",
      "[+] Creating Vue app...",
      "",
      "import { mapState } from 'vuex';",
      "",
      "async created() {",
      "  const db = firebase.firestore();",
      "  const meetups = await db",
      "    .collection('meetups').get();",
      "}",
      "",
      "$ npm run serve",
      "[+] App running on port 8080",
      "[+] Connected to Firebase"
    ],
    5: [ // Election Dapp
      "$ truffle compile",
      "Compiling Election.sol...",
      "",
      "contract Election {",
      "  mapping(address => bool) voted;",
      "  ",
      "  function vote(uint _candidateId) {",
      "    require(!voted[msg.sender]);",
      "    candidates[_candidateId].votes++;",
      "    voted[msg.sender] = true;",
      "  }",
      "}",
      "",
      "[+] Election contract deployed",
      "[+] Voting system active"
    ],
    6: [ // Without The White Coat
      "$ wp theme activate wtwc-custom",
      "[+] Theme activated",
      "",
      "<?php",
      "function custom_post_type() {",
      "  register_post_type('stories',",
      "    array(",
      "      'public' => true,",
      "      'label' => 'Stories'",
      "    )",
      "  );",
      "}",
      "?>",
      "",
      "[+] Custom post types registered",
      "[+] Healthcare stories live"
    ],
    7: [ // Woven Clinics
      "$ npx create-next-app woven",
      "[+] Creating Next.js app...",
      "",
      "import { useState } from 'react';",
      "",
      "export default function Clinic() {",
      "  const [appointments, setAppts] =",
      "    useState([]);",
      "  ",
      "  return <Calendar />;",
      "}",
      "",
      "$ npm run build",
      "[+] Optimized production build",
      "[+] Clinic portal deployed"
    ],
    8: [ // LGO Language Solutions
      "$ curl -X POST /api/translate",
      "[+] Translation API active",
      "",
      "const translateText = async () => {",
      "  const response = await fetch(",
      "    '/api/translate',",
      "    { method: 'POST',",
      "      body: { text, target } }",
      "  );",
      "  return response.json();",
      "}",
      "",
      "[+] Processing 15 languages",
      "[+] Translation complete"
    ]
  };

  const projects = [
    {
      id: 1,
      title: 'PROJECT_001',
      name: 'BLACKBOX',
      tech: 'REACT / WEB3 / IPFS / SOLIDITY',
      year: '2024'
    },
    {
      id: 2,
      title: 'PROJECT_002',
      name: 'CHAINFUND',
      tech: 'NEXT.JS / SOLIDITY / WEB3 / TRUFFLE',
      year: '2023'
    },
    {
      id: 3,
      title: 'PROJECT_003',
      name: 'CHIROPRACTIC ADMIN',
      tech: 'NUXT.JS / PRISMA / POSTGRESQL',
      year: '2024'
    },
    {
      id: 4,
      title: 'PROJECT_004',
      name: 'DEV MEETUP',
      tech: 'VUE.JS / VUETIFY / FIREBASE / VUEX',
      year: '2023'
    },
    {
      id: 5,
      title: 'PROJECT_005',
      name: 'ELECTION DAPP',
      tech: 'SOLIDITY / WEB3 / TRUFFLE / ETHEREUM',
      year: '2023'
    },
    {
      id: 6,
      title: 'PROJECT_006',
      name: 'WITHOUT THE WHITE COAT',
      tech: 'WORDPRESS / PHP / CUSTOM THEME',
      year: '2024'
    },
    {
      id: 7,
      title: 'PROJECT_007',
      name: 'WOVEN CLINICS',
      tech: 'REACT / NEXT.JS / TAILWIND / CMS',
      year: '2024'
    },
    {
      id: 8,
      title: 'PROJECT_008',
      name: 'LGO LANGUAGE SOLUTIONS',
      tech: 'CUSTOM WEB / TRANSLATION API',
      year: '2020'
    }
  ];

  return (
    <section style={{
      background: '#000',
      minHeight: '100vh',
      padding: '4rem 2rem',
      // borderTop: '8px solid #fff',
      // borderBottom: '8px solid #fff'
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        marginBottom: '4rem'
      }}>
        <h2 style={{
          fontSize: 'clamp(3rem, 2vw, 8rem)',
          fontWeight: 'bold',
          color: '#fff',
          letterSpacing: '-0.05em',
          lineHeight: '0.9',
          margin: 0,
          textTransform: 'uppercase',
          fontFamily: 'monospace'
        }}>
          SELECTED<br/>
          WORK
        </h2>
        <div style={{
          marginTop: '1rem',
          padding: '0.5rem 0',
          borderTop: '2px solid #fff',
          borderBottom: '2px solid #fff'
        }}>
          <p style={{
            fontFamily: 'monospace',
            color: '#fff',
            margin: 0,
            fontSize: '0.875rem',
            letterSpacing: '0.1em'
          }}>
            [ARCHIVE_2023-2024] — {projects.length} PROJECTS
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {projects.map((project, index) => (
          <div
            key={project.id}
            onMouseEnter={() => setHoveredProject(index)}
            onMouseLeave={() => setHoveredProject(null)}
            style={{
              border: '3px solid #fff',
              background: hoveredProject === index ? '#fff' : '#000',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Project Number */}
            <div style={{
              padding: '0.75rem 1rem',
              borderBottom: '3px solid ' + (hoveredProject === index ? '#000' : '#fff'),
              background: hoveredProject === index ? '#000' : 'transparent'
            }}>
              <span style={{
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                color: hoveredProject === index ? '#fff' : '#fff',
                letterSpacing: '0.2em',
                fontWeight: 'bold'
              }}>
                {project.title}
              </span>
            </div>

            {/* Media - Mini Terminal */}
            <div style={{
              height: '280px',
              background: '#000',
              position: 'relative'
            }}>
              <MiniTerminal 
                codeLines={projectCodeSnippets[project.id]} 
                title={`${project.name.toLowerCase().replace(/ /g, '-')}`}
              />
            </div>

            {/* Project Info */}
            <div style={{
              padding: '1.5rem',
              borderTop: '3px solid ' + (hoveredProject === index ? '#000' : '#fff'),
              background: hoveredProject === index ? '#fff' : 'transparent'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: hoveredProject === index ? '#000' : '#fff',
                margin: '0 0 0.5rem 0',
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                fontFamily: 'monospace'
              }}>
                {project.name}
              </h3>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginTop: '1rem'
              }}>
                <p style={{
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  color: hoveredProject === index ? '#000' : '#fff',
                  margin: 0,
                  letterSpacing: '0.05em',
                  opacity: 0.8
                }}>
                  {project.tech}
                </p>
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: hoveredProject === index ? '#000' : '#fff',
                  letterSpacing: '-0.05em'
                }}>
                  [{project.year}]
                </span>
              </div>
            </div>

            {/* Corner Accent */}
            <div style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              width: '20px',
              height: '20px',
              borderTop: '3px solid ' + (hoveredProject === index ? '#000' : '#fff'),
              borderRight: '3px solid ' + (hoveredProject === index ? '#000' : '#fff'),
              borderLeft: 'none',
              borderBottom: 'none',
              pointerEvents: 'none'
            }} />
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div style={{
        maxWidth: '1400px',
        margin: '4rem auto 0',
        padding: '1rem 0',
        borderTop: '2px solid #fff'
      }}>
        <a 
          href="https://github.com/mitthoma"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'monospace',
            color: '#fff',
            margin: 0,
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            textAlign: 'right',
            opacity: 0.7,
            textDecoration: 'none',
            display: 'block',
            transition: 'opacity 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
        >
          [VIEW_ALL_PROJECTS] → GITHUB.COM/MITTHOMA
        </a>
      </div>
    </section>
  );
}
