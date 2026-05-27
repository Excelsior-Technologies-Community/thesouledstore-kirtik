import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/pagination';

// ── Data ──────────────────────────────────────────────────────────────────
const latestDrops = [
  {
    id: 1,
    image: 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/ga_darth_vader_polo_homepage.jpg?w=1500&dpr=2',
    alt:   'Darth Vader Polo Collection',
    link:  '/products/men',
  },
  {
    id: 2,
    image: 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/home_nl.jpg?w=1500&dpr=2',
    alt:   'New streetwear drop',
    link:  '/products/men',
  },
  {
    id: 3,
    image: 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/homepage_3_CiVD9I9.jpg?w=1500&dpr=2',
    alt:   'Sneakers collection',
    link:  '/products/sneakers',
  },
  {
    id: 4,
    image: 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Paris_fashion_week_-_Homepage_banner_copy_0eWC7uh.jpg?w=1500&dpr=2',
    alt:   'Paris Fashion Week drop',
    link:  '/products/men',
  },
  {
    id: 5,
    image: 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Home_Page_banner_8.jpg?w=1500&dpr=2',
    alt:   'Accessories collection',
    link:  '/products/men',
  },
  {
    id: 6,
    image: 'https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/interlock_tees_homepage.jpg?w=1500&dpr=2',
    alt:   'Interlock tees',
    link:  '/products/men',
  },
];

// ── Component ─────────────────────────────────────────────────────────────
const LatestDrops = () => {
  // BUG FIX: use refs instead of CSS class selectors — selectors fail when
  // Swiper initialises before the DOM nodes are measured/found.
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="ld-section">
      <div className="ld-container">

        {/* Section header */}
        <div className="ld-header">
          <h2 className="ld-title">LATEST DROPS</h2>
        </div>
        
        <div className="ld-slider">

          {/* Custom prev arrow */}
          <button ref={prevRef} className="ld-arrow ld-arrow-prev" aria-label="Previous">
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>

          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            onBeforeInit={(swiper) => {
              // BUG FIX: pass refs BEFORE init so Swiper finds them correctly
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            speed={700}
            slidesPerView={1}
            className="ld-swiper"
          >
            {latestDrops.map((slide) => (
              <SwiperSlide key={slide.id} className="ld-slide">
                <Link to={slide.link} className="ld-slide-inner">
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="ld-image"
                    loading="lazy"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom next arrow */}
          <button ref={nextRef} className="ld-arrow ld-arrow-next" aria-label="Next">
            <ChevronRight size={24} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestDrops;
