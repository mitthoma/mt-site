"use client";

import { Fragment, useEffect } from "react";
import anime from 'animejs/lib/anime.es.js';

export default function Cube() {
    useEffect(() => {
        // Cube animation
        const cube = document.querySelector("#cube") as HTMLElement;
        const cubeRotation = { x: 0, y: 0, z: 0 };
        const cubeSides = Array.from(cube.querySelectorAll('.cube-face svg')) as SVGElement[];

        const rotateY = [0, 360];
        const rotateX = [0, 180];
        const duration = 30000;

        function animateCubeRotation() {
            anime({
                targets: cubeRotation,
                y: {
                    value: rotateY,
                    duration: duration,
                    easing: 'linear',
                },
                x: {
                    value: rotateX,
                    duration: duration,
                    easing: 'linear',
                },
                update: function() {
                    cube.style.transform = `rotateX(${cubeRotation.x}deg) rotateY(${cubeRotation.y}deg) rotateZ(${cubeRotation.z}deg)`;
                },
                loop: true,
            });
        }

        function animateGlitch() {
            cubeSides.forEach(applyGlitch);
        }

        function applyGlitch(side: SVGElement) {
            const scaleFactor = 0.9 + Math.random() * 0.2;
            const tx = -10 + Math.random() * 20;
            const ty = -10 + Math.random() * 20;

            anime({
                targets: side,
                scaleX: scaleFactor,
                scaleY: scaleFactor,
                translateX: tx,
                translateY: ty,
                duration: 100,
                complete: function() {
                    resetGlitch(side);
                },
            });
        }

        function resetGlitch(side: SVGElement) {
            anime({
                targets: side,
                scaleX: 1,
                scaleY: 1,
                translateX: 0,
                translateY: 0,
                duration: 100,
                complete: function() {
                    setTimeout(function() {
                        applyGlitch(side);
                    }, 1000 + Math.random() * 4000);
                },
            });
        }

        animateCubeRotation();
        animateGlitch();

        // Holgraphic Steps
        const holgraphicSteps = document.getElementById('holgraphicSteps') as HTMLElement;

        const titles = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6"];
        const descriptions = ["Idea Consultation", "Mockups/Design", "Structural Development", "Stylizing", "Beta Testing", "Launch"];

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
            images[currentImageIndex].style.display = 'none'; 
            currentImageIndex = (currentImageIndex + 1) % images.length; 
            images[currentImageIndex].style.display = 'block'; 
        }, 400); 

        // Cleanup function
        return () => {
            clearInterval(imageInterval);
        };
    }, []);

    return (
        <Fragment>
            <div className="cube-container">
                <div className="flex-container">
                    <div className="scene">
                        <div className="cube" id="cube">
                            <div className="cube-face front">
                                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5,5 L95,5 L95,95 L5,95 Z" stroke="#eaeaea" strokeWidth="2" fill="transparent"/>
                                </svg>
                            </div>
                            <div className="cube-face back">
                                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5,5 L95,5 L95,95 L5,95 Z" stroke="#eaeaea" strokeWidth="2" fill="transparent"/>
                                </svg>
                            </div>
                            <div className="cube-face right">
                                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5,5 L95,5 L95,95 L5,95 Z" stroke="#eaeaea" strokeWidth="2" fill="transparent"/>
                                </svg>
                            </div>
                            <div className="cube-face left">
                                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5,5 L95,5 L95,95 L5,95 Z" stroke="#eaeaea" strokeWidth="2" fill="transparent"/>
                                </svg>
                            </div>
                            <div className="cube-face top">
                                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5,5 L95,5 L95,95 L5,95 Z" stroke="#eaeaea" strokeWidth="2" fill="transparent"/>
                                </svg>
                            </div>
                            <div className="cube-face bottom">
                                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5,5 L95,5 L95,95 L5,95 Z" stroke="#eaeaea" strokeWidth="2" fill="transparent"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ul id="holgraphicSteps" />
            {/* Include rotating images here */}
        </Fragment>
    );
}
