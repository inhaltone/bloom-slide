import './style.css'
import setupSlider from "./shaderSlider.js";
import image1 from '/tex/OPUS TEXTURE 1.jpg';
import image2 from '/tex/OPUS TEXTURE 2.jpg';
import image3 from '/tex/OPUS TEXTURE 3.jpg';
import image4 from '/tex/OPUS TEXTURE 4.jpg';
import image5 from '/tex/OPUS TEXTURE 5.jpg';
import image6 from '/tex/OPUS TEXTURE 6.jpg';
import image7 from '/tex/OPUS TEXTURE 7.jpg';
import image8 from '/tex/OPUS TEXTURE 8.jpg';
import image9 from '/tex/OPUS TEXTURE 9.jpg';
import image10 from '/tex/OPUS TEXTURE 10.jpg';
import image11 from '/tex/OPUS TEXTURE 11.jpg';


window.onload = () => {
    const imageList = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image10, image11];
    setupSlider({
            targetElement: document.querySelector('#canvas'),
            imageList: imageList
        }
    );
}
