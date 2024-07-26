'use client';
import { Prefectures } from './components/Prefectures';
import { Graph } from './components/Graph';
import { useState } from 'react';

export default function Home() {
  const [prefCode, setPrefCode] = useState([
    { prefCode: 1, prefName: '北海道' },
  ]);
  const [prefArray, setPrefArray] = useState([]);
  return (
    <div className="p-4">
      <header>
        <h1>都道府県人口チャート</h1>
      </header>
      <section className="mt-4">
        <h2>都道府県</h2>
        <div className="mt-2">
          <Prefectures
            prefCode={prefCode}
            setPrefCode={setPrefCode}
            prefArray={prefArray}
            setPrefArray={setPrefArray}
          />
        </div>
      </section>

      <section className="mt-8">
        <Graph prefCode={prefCode} prefArray={prefArray} />
      </section>

      <footer className="p-4 text-sm">
        出典：RESAS（地域経済分析システム）
      </footer>
    </div>
  );
}
