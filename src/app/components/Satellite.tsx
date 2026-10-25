"use client";

import { Fragment, useEffect, useRef } from "react";
import { useActive } from '../hooks/useActive';

const ORBITS = [
    { title: 'Agents', desc: 'Orchestration · tool use · gates' },
    { title: 'Evals', desc: 'Golden sets · judges · CI gates' },
    { title: 'Backend', desc: 'Node · TypeScript · Postgres' },
    { title: 'Frontend', desc: 'React · Next · Vue · Nuxt' },
    { title: 'Infra', desc: 'AWS · Docker · CI/CD · traces' },
    { title: 'Regulated', desc: 'Pharma · MLR · audit trails' },
];

/**
 * THE ARRAY — six interleaved orbits around a glowing core.
 * Geometry, colors, periods, and the power-on stagger live in CSS
 * (per-orbit custom properties). JS only builds the DOM and pauses the
 * animations when the array is offscreen / tab hidden / reduced motion.
 */
export default function Satellite() {
    const rootRef = useRef<HTMLUListElement>(null);
    const active = useActive(rootRef);

    useEffect(() => {
        const list = rootRef.current;
        if (!list) return;
        list.innerHTML = '';

        ORBITS.forEach((o, idx) => {
            const li = document.createElement('li');
            li.className = 'proxz-nav__orbit';
            li.dataset.step = String(idx + 1);

            const a = document.createElement('a');
            a.className = 'proxz-nav__satellite';
            a.href = '#';
            a.setAttribute('aria-label', `${o.title}: ${o.desc}`);
            a.addEventListener('click', (e) => e.preventDefault());

            const label = document.createElement('span');
            label.className = 'proxz-nav__label';
            label.textContent = o.title;
            const desc = document.createElement('span');
            desc.className = 'proxz-nav__description';
            desc.textContent = o.desc;
            label.appendChild(desc);
            a.appendChild(label);
            li.appendChild(a);

            li.addEventListener('mouseover', () => {
                list.querySelectorAll('.active-step').forEach((el) => el.classList.remove('active-step'));
                li.classList.add('active-step');
            });
            li.addEventListener('mouseout', () => {
                setTimeout(() => {
                    if (!list.querySelector(':hover')) {
                        list.querySelectorAll('.active-step').forEach((el) => el.classList.remove('active-step'));
                        list.querySelector('[data-step="1"]')?.classList.add('active-step');
                    }
                }, 200);
            });
            if (idx === 0) li.classList.add('active-step');
            list.appendChild(li);
        });

        const core = document.createElement('li');
        core.className = 'array-core';
        core.setAttribute('aria-hidden', 'true');
        list.appendChild(core);

        return () => { list.innerHTML = ''; };
    }, []);

    useEffect(() => {
        const sys = rootRef.current?.closest('.proxz-nav__system') as HTMLElement | null;
        (sys ?? rootRef.current)?.style.setProperty('--orbit-play', active ? 'running' : 'paused');
    }, [active]);

    return (
        <Fragment>
            <ul id="holgraphicSteps" ref={rootRef} aria-label="Areas of practice" />
        </Fragment>
    );
}
