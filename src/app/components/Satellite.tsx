"use client";

import { Fragment, useEffect, useRef } from "react";
import { useActive } from '../hooks/useActive';

export default function Satellite() {
    const rootRef = useRef<HTMLUListElement>(null);
    const active = useActive(rootRef);

    useEffect(() => {
        if (!active) return;
        // Holgraphic Steps
        const holgraphicSteps = rootRef.current as HTMLElement | null;
        if (!holgraphicSteps) return;

        const titles = ["Architecture", "Frontend", "Backend", "Database", "DevOps", "Scale"];
        const descriptions = [
            "System Design & Patterns",
            "React · Next.js · TypeScript",
            "Node.js · Python · APIs",
            "PostgreSQL · Redis · MongoDB",
            "Docker · AWS · CI/CD",
            "Load Balancing · Caching"
        ];

        for (let i = 1; i <= 6; i++) {
            const li = document.createElement('li');
            li.className = 'proxz-nav__orbit';
            li.dataset.step = i.toString();

            const a = document.createElement('a');
            a.className = 'proxz-nav__satellite';
            a.href = "#";
            a.addEventListener('click', (e) => e.preventDefault());

            const span = document.createElement('span');
            span.className = 'proxz-nav__label';
            span.textContent = titles[i - 1];

            const description = document.createElement('span');
            description.className = 'proxz-nav__description';
            description.textContent = descriptions[i - 1];

            span.appendChild(description);
            a.appendChild(span);
            li.appendChild(a);

            li.addEventListener('mouseover', handleMouseOver);
            li.addEventListener('mouseout', handleMouseOut);

            if (i === 1) {
                li.classList.add('active-step');
            }

            holgraphicSteps?.appendChild(li);
        }

        function handleMouseOver(e: MouseEvent) {
            document.querySelectorAll('.active-step').forEach(function(activeStep) {
                activeStep.classList.remove('active-step');
            });

            (e.currentTarget as HTMLElement).classList.add('active-step');
        }

        function handleMouseOut(e: MouseEvent) {
            setTimeout(function() {
                if (!holgraphicSteps?.querySelector('.active-step')) {
                    holgraphicSteps?.querySelector('[data-step="1"]')?.classList.add('active-step');
                }
            }, 200);
        }

        // Cleanup: the orbit is rebuilt on each activation, so clear it.
        return () => {
            if (holgraphicSteps) holgraphicSteps.innerHTML = '';
        };
    }, [active]);

    // Pause the 12 CSS orbit animations when offscreen / tab hidden / reduced motion.
    useEffect(() => {
        const el = rootRef.current;
        if (!el) return;
        el.style.setProperty('--orbit-play', active ? 'running' : 'paused');
    }, [active]);

    return (
        <Fragment>
            <ul id="holgraphicSteps" ref={rootRef} />
        </Fragment>
    );
}
