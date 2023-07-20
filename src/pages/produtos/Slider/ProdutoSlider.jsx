import React from 'react';

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import Calca from "../../../assets/Icons/Calca.png";
import Shorts from "../../../assets/Icons/Shorts.png";
import TShirt from "../../../assets/Icons/Camiseta.png";
import Shoes from "../../../assets/Icons/Tenis.png";

import './ProdutoSlider.css'

const icons =
[
    {
      imagem: TShirt,
      link: '/products#t-shirt'
    },
    {
      imagem: Shorts,
      link: '/products#shorts'
    },
    {
      imagem: Calca,
      link: '/products#pants'
    },
    {
      imagem: Shoes,
      link: '/products#sneakers'
    },
];

const ProdutoSlider = () =>
{
  const handleDragStart = (e) => e.preventDefault();

    return (
      <AliceCarousel
          mouseTracking
          disableDotsControls
          keyboardNavigation
      >
            {icons.map((slide, index) => 
              {
                return(
                    <div key={index}>
                        <a href={slide.link}>
                            <img 
                              className="display-imagem" 
                              src={icons[index].imagem} 
                              alt={`Slide ${index + 1}`}
                              onDragStart={handleDragStart} 
                              role="presentation" 
                            />
                        </a>
                    </div>
                )
              })
            }
        </AliceCarousel>
      );
}

export default ProdutoSlider;