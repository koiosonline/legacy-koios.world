import { useEffect, useState } from 'react';
import { Tooltip, ResponsiveContainer, Treemap } from 'recharts';
import { getTokenHolders } from '../utils/getTokenHolders';

interface tokenholders {
  address: string,
  balance: string,
  value: null | number,
  erc20Symbol: string,
  id: string
}

const handleClick = (e) => {
  const url = `https://polygonscan.com/address/${e.address}`
  window.open(url, '_blank')
}

const Chart = () => {
  const [tokenHolders, setTokenHolders] = useState<tokenholders[]>([])
  const [withValueHolders, setWithValueHolders] = useState<tokenholders[]>([])
  const colors = ['#080875', '#18087C', '#3E0A86', '#6F0A95', '#970BA1']

  // Get's token data
  const handleTokenHolders = async () => {
    const holders = await getTokenHolders()
    if (holders.data.users.length >= 1) {
      setTokenHolders(holders.data.users);
    }
  }

  useEffect(() => {
    handleTokenHolders()
  }, [])

  // Converts token ammount per holder to actual tokens
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
      <ResponsiveContainer width='100%' height='100%'>
        <Treemap
          data={withValueHolders}
          nameKey="address"
          dataKey="value"
          isAnimationActive={true}
          animationEasing={'ease'}
          isUpdateAnimationActive={true}
          // @ts-ignore: recharts has type error in the colorPanel property.
          colorPanel={colors}
          onClick={(e) => handleClick(e)}
          >
          <Tooltip formatter={(value, name) => [`${value} Titan tokens`, name]}/>
        </Treemap>
      </ResponsiveContainer>
    </>
  )
}

export default Chart