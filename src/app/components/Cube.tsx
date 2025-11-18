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
            const tx = -50 + Math.random() * 30;
            const ty = -10 + Math.random() * 30;

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
        // Cleanup function
        return () => {
            // clearInterval(imageInterval);
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
                                    <path d="M5,5 L95,5 L95,95 L5,95 Z" stroke="#eaeaea" strokeWidth="0" fill="#eaeaea"/>
                                </svg>
                            </div>
                            <div className="cube-face back">
                                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5,5 L95,5 L95,95 L5,95 Z" stroke="#eaeaea" strokeWidth="0" fill="#eaeaea"/>
                                </svg>
                            </div>
                            <div className="cube-face right">
                                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5,5 L95,5 L95,95 L5,95 Z" stroke="#eaeaea" strokeWidth="0" fill="#eaeaea"/>
                                </svg>
                            </div>
                            <div className="cube-face left">
                                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5,5 L95,5 L95,95 L5,95 Z" stroke="#eaeaea" strokeWidth="0" fill="#eaeaea"/>
                                </svg>
                            </div>
                            <div className="cube-face top">
                                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5,5 L95,5 L95,95 L5,95 Z" stroke="#eaeaea" strokeWidth="0" fill="#eaeaea"/>
                                </svg>
                            </div>
                            <div className="cube-face bottom">
                                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5,5 L95,5 L95,95 L5,95 Z" stroke="#eaeaea" strokeWidth="0" fill="#eaeaea"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
