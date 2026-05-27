import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides } from '../data/products';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HeroCarousel = () => {
  return (
    <section className="hero">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={{
          prevEl: '.hero-arrow.prev',
          nextEl: '.hero-arrow.next',
        }}
        pagination={{
          el: '.hero-dots',
          clickable: true,
          bulletClass: 'hero-dot',
          bulletActiveClass: 'active',
          renderBullet: (index, className) => {
            return `<button class="${className}" aria-label="Slide ${index + 1}"></button>`;
          }
        }}
        className="hero-swiper-container"
        style={{ width: '100%' }}
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="hero-main">
              <img src={slide.image} alt={slide.subtitle} className="hero-img" />
              <div className="hero-overlay">
                <div className="hero-text">
                  {slide.season && (
                    <div className="hero-season">
                      <span className="hero-sun">☀</span>
                      <span>{slide.season}</span>
                    </div>
                  )}
                  <p className="hero-title-sm">{slide.title}</p>
                  <h2 className="hero-title">{slide.subtitle}</h2>
                  <div className="hero-tags-wrap">
                    {slide.tags && slide.tags.split('|').map((t, idx) => (
                      <span key={idx} className="hero-tag-text">{t.trim()}</span>
                    )).reduce((acc, el, idx, arr) => {
                      if (idx === 0) return [el];
                      return [...acc, <span key={`sep-${idx}`} className="hero-tag-sep">|</span>, el];
                    }, [])}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="hero-arrow prev" aria-label="Previous">
        <ChevronLeft size={20} />
      </button>
      <button className="hero-arrow next" aria-label="Next">
        <ChevronRight size={20} />
      </button>

      <div className="hero-dots"></div>
    </section>
  );
};

export default HeroCarousel;
