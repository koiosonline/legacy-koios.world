import axios from 'axios';

const fetchCalendarData = async () => {
    const url = 'https://koios-middleware.herokuapp.com/calendar'
    return new Promise(async (resolve) => {
      axios
        .get(url)
        .then((res: any) => {
          resolve(res.data.data || res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    })
}

export default fetchCalendarData