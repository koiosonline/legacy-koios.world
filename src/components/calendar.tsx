import { useEffect, useState } from "react";
import fetchCalendarData from "../utils/fetchCalendar";
import formatDate from "../utils/dateFormat";
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import { Navigation, Scrollbar, A11y, Autoplay, Pagination } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Navigation module

const Calendar = () => {
  const [calendarData, setCalendarData] = useState<[]>()
  const [slideAmmount, setSlideAmmount] = useState<number>(3)

  useEffect(() => {
    fetchCalendarData().then((res: []) => {
      setCalendarData(res);
    })
    handleSlideAmmount()
  }, [])

  const handleSlideAmmount = () => {
    const width = window.innerWidth;
    
    if (width <= 420) {
      setSlideAmmount(1)
    } else if (width > 420 && width <= 980) {
      setSlideAmmount(2)
    } else {
      setSlideAmmount(3)
    }
  }

  return (
    <div className={'slider-container'}>
      <h2>Upcoming events</h2>
      <Swiper
        modules={[Navigation, Scrollbar, A11y, Autoplay, Pagination]}
        pagination={{ clickable: true }}
        // navigation
        slidesPerView={slideAmmount}
        spaceBetween={16}
        autoplay={{ delay: 5000 }}
      >
        {calendarData && 
          calendarData.map((data: any, index) => {
            return (
              <SwiperSlide key={index}>
                {({ isActive }) => (
                  <a href={data.htmlLink} className={`calendar-card`}>
                  <div className={`card ${isActive ? 'active' : ''}`}>
                    <div className={'card__date'}>
                      <p className={'date'}>{formatDate(data.start.dateTime, 'day')}</p>
                      <div className={'month-year'}>
                        <p>{formatDate(data.start.dateTime, 'month')}</p>
                        <p>{formatDate(data.start.dateTime, 'year')}</p>
                      </div>
                    </div>
                    <div className={'card__info'}>
                      <h3>{data.summary}</h3>
                    </div>
                  </div>
                </a>
                )}
              </SwiperSlide>
            )
          })
        }
        <SwiperSlide>
          <a className={'calendar-card'} href={'google.com'}>
            <div className={'card'}>
              <div className={'card__date'}>
                <p className={'date'}>8</p>
                <div className={'month-year'}>
                  <p>June</p>
                  <p>2021</p>
                </div>
              </div>
              <div className={'card__info'}>
                <h3>Koios meetup</h3>
              </div>
            </div>
          </a>
        </SwiperSlide>

        <SwiperSlide>
          <a className={'calendar-card'} href={'google.com'}>
            <div className={'card'}>
              <div className={'card__date'}>
                <p className={'date'}>8</p>
                <div className={'month-year'}>
                  <p>June</p>
                  <p>2021</p>
                </div>
              </div>
              <div className={'card__info'}>
                <h3>Koios meetup</h3>
              </div>
            </div>
          </a>
        </SwiperSlide>

        <SwiperSlide>
          <a className={'calendar-card'} href={'google.com'}>
            <div className={'card'}>
              <div className={'card__date'}>
                <p className={'date'}>8</p>
                <div className={'month-year'}>
                  <p>June</p>
                  <p>2021</p>
                </div>
              </div>
              <div className={'card__info'}>
                <h3>Koios meetup</h3>
              </div>
            </div>
          </a>
        </SwiperSlide>

        {calendarData?.length < 1 && 
          <img src={'./images/koios-icon.svg'} alt={'element'}/>
        }
      </Swiper>
      {/* <div onClick={next}>next</div> */}
    </div>
  )
}

export default Calendar