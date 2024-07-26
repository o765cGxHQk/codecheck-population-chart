'use client';
import { Prefectures } from './components/Prefectures';
import { Graph } from './components/Graph';
import { useState } from 'react';

export default function Home() {
  const [prefCode, setPrefCode] = useState([
    { prefCode: 1, prefName: '北海道' },
  ]);
  const [prefArray, setPrefArray] = useState([]);
  const [prefName, setPrefName] = useState('');
  // チェックしたら、配列に追加
  // チェックが外れたら、配列から除外
  const [graphArray, setGraphArray] = useState([
    { type: 'line', name: '', data: [] },
  ]);
  // 別の配列
  // 西暦
  // []
  // [{
  //     type: 'line',
  //     name: 'name',
  //     data: [], // 人口
  //   },{},{}]

  console.log(graphArray[0]);
  console.log(graphArray);

  // const populationArray = prefArray.map((item) =>
  //   item.map((childItem) => childItem.value),
  // );

  return (
    <div className="p-4">
      <header>
        <h1>都道府県人口チャート</h1>
      </header>
      <section className="mt-4">
        <h2>都道府県</h2>
        <div className="mt-2">
          <Prefectures
            graphArray={graphArray}
            setGraphArray={setGraphArray}
            setPrefName={setPrefName}
            prefCode={prefCode}
            setPrefCode={setPrefCode}
            prefArray={prefArray}
            setPrefArray={setPrefArray}
          />
        </div>
      </section>

      <section className="mt-8">
        <Graph prefArray={prefArray} />
      </section>

      <footer className="p-4 text-sm">
        出典：RESAS（地域経済分析システム）
      </footer>
    </div>
  );
}
