'use client';

import { useEffect, useState } from 'react';

export function Prefectures({
  prefCode,
  setPrefCode,
  prefArray,
  setPrefArray,
}) {
  const [option, setOption] = useState('総人口');
  const [population, setPopulation] = useState([{}]);
  const options = ['総人口', '年少人口', '生産年齢人口', '老年人口'];

  useEffect(() => {
    const prefucture = async () => {
      try {
        const res = await fetch('/api/v1/prefectures');
        const data = await res.json();
        return setPrefCode([...data.data.result]);
      } catch (err) {
        console.log(err);
      }
    };
    prefucture();
  }, []);

  const getPopuration = async () => {
    const response = await fetch(
      `/api/v1/population/composition/perYear?prefCode=${prefCode[0].prefCode}`,
    );
    const data = await response.json();
    const prefData = data.data.result.data;
    const filterData = prefData.filter((item: any) => {
      if (item.label === option) return item.data;
    });
    // TODO: 先頭に{}オブジェクトが入るので詰める
    return setPrefArray([...prefArray, filterData[0].data]);
  };

  const handlePref = (code: number) => {
    getPopuration();
  };

  const handleOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption(() => e.target.value);
    getPopuration();
  };

  return (
    <>
      <ul className="grid grid-cols-7">
        {prefCode.map((item) => {
          return (
            <li key={item.prefName}>
              <label
                className="p-2 hover:bg-slate-100 hover:cursor-pointer"
                onClick={() => handlePref(item.prefCode)}
              >
                <input type="checkbox" /> {item.prefName}
              </label>
            </li>
          );
        })}
      </ul>
      <ul className="grid grid-cols-4 mt-8">
        {options.map((item) => {
          return (
            <li key={item}>
              <label>
                <input
                  type="radio"
                  name="option"
                  value={item}
                  defaultChecked
                  onChange={(e) => handleOption(e)}
                />
                {item}
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
}
