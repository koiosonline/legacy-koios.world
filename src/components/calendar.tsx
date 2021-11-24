import { useEffect, useState, useRef } from "react";
import Flickity from "react-flickity-component";
import fetchCalendarData from "../utils/fetchCalendar";
import formatDate from "../utils/dateFormat";

const Calendar = () => {
  const [calendarData, setCalendarData] = useState<[]>()

  useEffect(() => {
    fetchCalendarData().then((res: []) => {
      setCalendarData(res);
    })
  }, [])

  const flkty: any = useRef(null);

  if (calendarData) {
    console.log(calendarData);
  }

  const options = {
    prevNextButtons: false,
    pageDots: false,
    cellAlign: 'left',
    contain: false
    // autoPlay: true
  }

  return (
    <div className={'slider-container'}>
      <h2>Upcoming events</h2>
      <Flickity
        options={options}
      >
      {calendarData && 
        calendarData.map((data: any, index) => {
          return (
            <a key={index} href={data.htmlLink} className={'calendar-card'}>
              <div className={'card'}>
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
          )
        })
      }
      <a className={'calendar-card'}>
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
            <a className={'calendar-card'}>
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
            <a className={'calendar-card'}>
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
      </Flickity>
    </div>
  )
}

export default Calendar