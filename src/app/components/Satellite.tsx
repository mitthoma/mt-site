"use client";

import { Fragment, useEffect } from "react";
import anime from 'animejs/lib/anime.es.js';

export default function Satellite() {
    useEffect(() => {
        // Holgraphic Steps
        const holgraphicSteps = document.getElementById('holgraphicSteps') as HTMLElement;

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

        // Rotating Images
        let currentImageIndex = 0;
        const images = document.querySelectorAll('.rotating-image') as NodeListOf<HTMLElement>;

        const imageInterval = setInterval(() => {

            if (images[currentImageIndex]) {

            
            images[currentImageIndex].style.display = 'none'; 
            currentImageIndex = (currentImageIndex + 1) % images.length; 
            images[currentImageIndex].style.display = 'block'; 
            }
        }, 400); 

        // Cleanup function
        return () => {
            clearInterval(imageInterval);
        };
    }, []);

    return (
        <Fragment>
            <ul id="holgraphicSteps" />
        </Fragment>
    );
}
