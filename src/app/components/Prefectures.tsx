'use client';

import { useEffect, useState } from 'react';

export function Prefectures({
  graphArray,
  setGraphArray,
  setPrefName,
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
  }, [setPrefCode]);

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

  const handlePref = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 都道府県名をクリックした時は
    // true
    if (e.target.checked) {
      // 1. クリックした都道府県をセットする
      setPrefName(e.target.value);

      // graphArray[0]
      // ↑↓同じ
      // [{ type: 'line', name: '', data: [] }][0]
      setGraphArray({
        ...[{ type: 'line', name: '', data: [] }][0],
        name: e.target.value,
      });
      console.log(graphArray);

      // 2. 都道府県のAPIデータを取得する
      getPopuration();
      // 3. 再描画
    }

    // false
    // 1. クリックした都道府県を除外する
    // 2. クリックした都道府県以外のデータを取得する
    // 3. 再描画
  };

  const handleOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 総人口などのラジオボタンをクリックした時は
    // 1. 都道府県のAPIデータを取得する
    // 1-a. クリックしたラベルに対応するラベルの西暦・人口を切り出す
    // 2. 再描画
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
                onChange={handlePref}
              >
                <input type="checkbox" value={item.prefName} /> {item.prefName}
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
