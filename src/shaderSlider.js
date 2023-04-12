import * as THREE from "three";
import {RenderPass} from "three/addons/postprocessing/RenderPass.js";
import {UnrealBloomPass} from "three/addons/postprocessing/UnrealBloomPass.js";
import {EffectComposer} from "three/addons/postprocessing/EffectComposer.js";
import {GUI} from "three/addons/libs/lil-gui.module.min.js";
import {AfterimagePass} from "three/addons/postprocessing/AfterimagePass.js";
import {ShaderPass} from "three/addons/postprocessing/ShaderPass.js";
import {BleachBypassShader} from "three/addons/shaders/BleachBypassShader.js";
import {FilmPass} from "three/addons/postprocessing/FilmPass.js";

export default function setupSlider({targetElement, imageList}) {
    window.addEventListener('resize', onWindowResize);
    // document.addEventListener('mousemove', onDocumentMouseMove);
    let mouseX = 0;
    let mouseY = 0;

    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    const BG_COLOR = new THREE.Color(0.9, 0.9, 0.9, 0);

    const renderer = new THREE.WebGLRenderer({canvas: targetElement, antialias: true});
    renderer.setClearColor(BG_COLOR);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 5;

    const textureList = imageList.map((image) => new THREE.TextureLoader().load(image));
    const geometry = new THREE.PlaneGeometry(2000, 1500, 1, 1);
    const group = new THREE.Group();
    group.position.z = -1800;
    scene.add(group);
    for (const tex of textureList) {
        const material = new THREE.MeshBasicMaterial({
            map: tex
        })
        const mesh = new THREE.Mesh(geometry, material);
        group.add(mesh);
    }


    const params = {
        exposure: 0.9,
        bloomStrength: 0,
        bloomThreshold: 0.1,
        bloomRadius: 1
    };


    // SFX
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    bloomPass.threshold = params.bloomThreshold;
    bloomPass.strength = params.bloomStrength;
    bloomPass.radius = params.bloomRadius;

    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    const afterimagePass = new AfterimagePass(0.99);
    composer.addPass(afterimagePass);

    const effectBleach = new ShaderPass(BleachBypassShader);
    effectBleach.uniforms['opacity'].value = 1;
    // composer.addPass(effectBleach);

    const effectFilm = new FilmPass(.2, 0, 0, false);
    composer.addPass(effectFilm);


    let counter = 0;

    showLayerByIndex(3);
    setInterval(() => play(), 4000);

    async function play() {
        await transition(1000, 0, 1);
        nextSlide();
        await transition(1000, 1, -1);
    }

    function nextSlide() {
        hideAllLayers();
        showLayerByIndex(counter);
        ++counter;
        if (counter === group.children.length) {
            counter = 0;
        }
        group.matrixWorldNeedsUpdate = true;
    }

    function hideAllLayers() {
        group.children.map(mesh => mesh.visible = false);
    }

    function showLayerByIndex(index) {
        group.children[index].visible = true;
    }


    // const gui = new GUI();
    //
    // gui.add(params, 'exposure', 0.1, 2).onChange(function (value) {
    //
    //     renderer.toneMappingExposure = Math.pow(value, 4.0);
    //
    // });
    //
    // gui.add(params, 'bloomThreshold', 0.0, 1.0).onChange(function (value) {
    //
    //     bloomPass.threshold = Number(value);
    //
    // });
    //
    // gui.add(params, 'bloomStrength', 0.0, 3.0).onChange(function (value) {
    //
    //     bloomPass.strength = Number(value);
    //
    // });
    //
    // gui.add(params, 'bloomRadius', 0.0, 1.0).step(0.01).onChange(function (value) {
    //
    //     bloomPass.radius = Number(value);
    //
    // });

    function transition(duration = 2000, start = 0, end = 4) {
        let startTime = Date.now();
        return new Promise((resolve) => {
            const animate = () => {
                const elapsed = Date.now() - startTime;
                if (elapsed < duration) {
                    const sample = easeInOutQuart(elapsed, start, end, duration);
                    bloomPass.strength = sample;
                    window.requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            }
            animate();
        });
    }

    function onDocumentMouseMove(event) {

        mouseX = (event.clientX - windowHalfX) / 100;
        mouseY = (event.clientY - windowHalfY) / 100;

    }

    function render() {
        const time = Date.now() * 0.0005;
        renderer.render(scene, camera);
        composer.render();
        camera.position.x += (mouseX - camera.position.x) * .0005;
        camera.position.y += (-mouseY - camera.position.y) * .0005;
        camera.lookAt(scene.position);
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);

    function onWindowResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    }
}

function easeOutQuart(elapsed, initialValue, amountOfChange, duration) {
    return -amountOfChange * ((elapsed = elapsed / duration - 1) * elapsed * elapsed * elapsed - 1) + initialValue;
}

function easeInOutQuart(elapsed, initialValue, amountOfChange, duration) {
    if ((elapsed /= duration / 2) < 1) {
        return amountOfChange / 2 * elapsed * elapsed * elapsed * elapsed + initialValue;
    }
    return -amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed * elapsed - 2) + initialValue;
}
