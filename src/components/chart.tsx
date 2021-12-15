import { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Treemap } from 'recharts';
import { getTokenHolders } from '../utils/getTokenHolders';

interface tokenholders {
  address: string,
  balance: string,
  value: null | number,
  erc20Symbol: string,
  id: string
}

const Chart = () => {
  const [width, setWidth] = useState(window.innerWidth)
  const [tokenHolders, setTokenHolders] = useState<tokenholders[]>([])
  const [withValueHolders, setWithValueHolders] = useState<any[]>([])
  const colors = ['#080875', '#18087C', '#3E0A86', '#6F0A95', '#970BA1']

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth)
    })
  })

  const handleTokenHolders = async () => {
    const holders = await getTokenHolders()
    if (holders.data.users.length >= 1) {
      setTokenHolders(holders.data.users);
    }
  }

  useEffect(() => {
    handleTokenHolders()
  }, [])

  useEffect(() => {
    if (tokenHolders) {
      tokenHolders.map((data) => {
        return data.value = parseInt(data.balance) / 1000000000000000000;
      })
      setWithValueHolders(tokenHolders)
    }
  }, [tokenHolders])


  return (
    <>
    <p>Top 100 Titan token decentralization</p>
      <ResponsiveContainer width={width >= 500 ? 480 : 350} height={width >= 500 ? 480 : 350}>
        <Treemap
          data={withValueHolders}
          nameKey="address"
          dataKey="value"
          isAnimationActive={true}
          animationEasing={'ease'}
          isUpdateAnimationActive={true}
          // @ts-ignore: recharts has type error in the colorPanel property.
          colorPanel={colors}
        >
          <Tooltip formatter={(value, name) => [`${value} Titan tokens`, name]}/>
        </Treemap>
      </ResponsiveContainer>
    </>
  )
}

export default Chart