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
import trans from '/tex/trans-1.png';
import trans2 from '/tex/trans-2.png';
import trans3 from '/tex/trans-3.png';
import trans4 from '/tex/trans-4.png';
import trans5 from '/tex/trans-5.png';
import trans6 from '/tex/trans-6.png';
import trans7 from '/tex/trans-7.png';
import trans8 from '/tex/trans-8.png';
import trans9 from '/tex/trans-9.png';
import trans10 from '/tex/trans-10.png';
import trans11 from '/tex/trans-11.png';


window.onload = () => {
    const imageList = [trans, trans2, trans3, trans4, trans5, trans6, trans7, trans8, trans9, trans10, trans11];

    // const imageList = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image10, image11];
    setupSlider({
            targetElement: document.querySelector('#canvas'),
            imageList: imageList
        }
    );
}
