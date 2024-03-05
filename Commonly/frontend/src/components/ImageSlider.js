import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ImageSlider.css'; // Import your custom styles

const ImageSlider = () => {
  const images = [
    'https://th.bing.com/th/id/R.15f09cdead36a93d1c8f59057563f27e?rik=GCvBeUhroacMcw&riu=http%3a%2f%2fwww.citysearch.pk%2fUF%2fCompanies%2f7654%2fthe-lyceum-logo.png&ehk=34ZV8w9VRrstgx0P3rzD2HwaJm2bcRbiG3ZMXJRtyQk%3d&risl=&pid=ImgRaw&r=0',
    'https://i.brecorder.com/primary/2020/11/5fa2a09b8b7ce.jpg',
    'https://admissions.cedar.edu.pk/img/central_logo.png',
    'https://play-lh.googleusercontent.com/b0J82epnts7d43agbovaUdZ8OPBfuDke30nNK8hfoFjzBTsSOlISlowDQ6oGVJFqfDY',
    'https://static.wixstatic.com/media/66db09_30015095052144b1abf7834aed709a46~mv2.png/v1/fill/w_554,h_126,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Nixor%20Logo%202-2.png',
    'https://sceptrecollege.edu.pk/wp-content/uploads/2020/11/logo.png',
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true, // Adjusts the height of the slider to the current slide
  };

  return (
    <div className="image-slider">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              style={{ width: '100%', height: '300px' }} // Adjust image styling
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
