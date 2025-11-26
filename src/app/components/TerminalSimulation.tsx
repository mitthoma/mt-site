"use client";

import { useEffect, useRef, useState } from 'react';
import GlitchText from './GlitchText';

const CODE_LINES = [
  "$ ./initiate_breach.sh",
  "[*] Initializing quantum encryption bypass...",
  "[+] Establishing secure tunnel to 192.168.0.1",
  "[+] Connection established",
  "",
  "$ nmap -sV -T4 192.168.0.0/24",
  "Starting Nmap scan on 256 hosts...",
  "Discovered open port 22/tcp on 192.168.0.15",
  "Discovered open port 443/tcp on 192.168.0.15",
  "Discovered open port 8080/tcp on 192.168.0.15",
  "",
  "$ ssh root@192.168.0.15",
  "[*] Attempting SSH brute force...",
  "[*] Trying: admin/admin... FAILED",
  "[*] Trying: root/toor... FAILED",
  "[*] Trying: admin/password123... SUCCESS",
  "[+] Access granted to mainframe",
  "",
  "$ cat /etc/shadow",
  "root:$6$xyz789$...:18500:0:99999:7:::",
  "daemon:*:18500:0:99999:7:::",
  "sys:*:18500:0:99999:7:::",
  "",
  "$ python3 exploit.py --target 192.168.0.15",
  "[*] Loading exploit modules...",
  "[+] Buffer overflow detected at 0x7fff5fbff8a0",
  "[+] Injecting shellcode...",
  "[+] Privilege escalation successful",
  "[+] Root access obtained",
  "",
  "$ ./decrypt_vault.py",
  "[*] Analyzing encryption algorithm...",
  "[*] AES-256 detected",
  "[*] Running quantum decryption...",
  "[████████████████████] 100%",
  "[+] Vault decrypted successfully",
  "",
  "$ ls -la /secure/data/",
  "drwxr-xr-x  5 root  root  4096 Nov 26 12:20 .",
  "drwxr-xr-x 24 root  root  4096 Nov 26 12:15 ..",
  "-rw-------  1 root  root  2048 Nov 26 11:30 credentials.db",
  "-rw-------  1 root  root  8192 Nov 26 11:45 financial_records.enc",
  "-rw-------  1 root  root  4096 Nov 26 12:00 api_keys.txt",
  "",
  "$ cat api_keys.txt",
  "AWS_ACCESS_KEY=AKIA...XY7Z",
  "STRIPE_SECRET_KEY=sk_live_...",
  "GITHUB_TOKEN=ghp_...",
  "",
  "$ ./exfiltrate_data.sh",
  "[*] Compressing files...",
  "[*] Encrypting payload...",
  "[*] Uploading to secure server...",
  "[████████████████████] 100%",
  "[+] Data exfiltration complete",
  "",
  "$ ./clean_logs.sh",
  "[*] Removing traces...",
  "[+] /var/log/auth.log cleared",
  "[+] /var/log/secure cleared",
  "[+] bash history wiped",
  "[+] All traces removed",
  "",
  "$ exit",
  "Connection closed.",
];

export default function TerminalSimulation() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [glitchLineIndices, setGlitchLineIndices] = useState<Set<number>>(new Set());
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentLineIndex >= CODE_LINES.length) {
      // Reset after finishing
      setTimeout(() => {
        setDisplayedLines([]);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
        setGlitchLineIndices(new Set());
      }, 3000);
      return;
    }

    const currentLine = CODE_LINES[currentLineIndex];

    if (currentCharIndex < currentLine.length) {
      // Type out current line character by character
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          newLines[currentLineIndex] = currentLine.substring(0, currentCharIndex + 1);
          return newLines;
        });
        setCurrentCharIndex(prev => prev + 1);
      }, 30); // Typing speed

      return () => clearTimeout(timeout);
    } else {
      // Move to next line
      const timeout = setTimeout(() => {
        // Randomly decide if this line should glitch
        if (Math.random() < 0.15) { // 15% chance
          setGlitchLineIndices(prev => new Set(prev).add(currentLineIndex));
        }

        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, currentLine.length === 0 ? 100 : 500); // Pause at end of line

      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayedLines]);

  return (
    <div style={{
      background: '#0a0a0a',
      border: '2px solid #333',
      borderRadius: '8px',
      overflow: 'hidden',
      fontFamily: 'monospace',
      boxShadow: '0 0 20px rgba(0, 255, 0, 0.1)'
    }}>
      {/* Terminal Header */}
      <div style={{
        background: '#1a1a1a',
        padding: '0.75rem 1rem',
        borderBottom: '1px solid #333',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
        </div>
        <span style={{ color: '#666', fontSize: '0.875rem', marginLeft: '1rem' }}>
          bash — mitchell@localhost
        </span>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        style={{
          padding: '1.5rem',
          height: '500px',
          overflowY: 'auto',
          color: '#00ff00',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          fontFamily: 'Courier New, monospace'
        }}
        className="hide-scrollbar"
      >
        {displayedLines.map((line, index) => (
          <div key={index} style={{ marginBottom: '0.25rem' }}>
            {line && glitchLineIndices.has(index) && line.length > 0 ? (
              <GlitchText trigger="continuous" interval={3000} speed={40}>
                {line}
              </GlitchText>
            ) : (
              line || ''
            )}
            {index === currentLineIndex && currentLineIndex < CODE_LINES.length && currentCharIndex < CODE_LINES[currentLineIndex].length && (
              <span style={{
                display: 'inline-block',
                width: '8px',
                height: '1em',
                background: '#00ff00',
                animation: 'blink 1s infinite',
                marginLeft: '2px'
              }} />
            )}
          </div>
        ))}

        <style jsx>{`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }

          .hide-scrollbar {
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE and Edge */
          }

          .hide-scrollbar::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }
        `}</style>
      </div>
    </div>
  );
}
