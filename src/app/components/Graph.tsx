'use client';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useRef } from 'react';

export const Graph = (props: HighchartsReact.Props) => {
  const yearArray = props.prefArray.map((item) => {
    return item.map((childItem) => childItem.year);
  });
  const popArray = props.prefArray.map((item) => {
    return item.map((childItem) => childItem.value);
  });
  console.log(yearArray);
  //
  const options: Highcharts.Options = {
    title: {
      text: 'Fruit Consumption',
    },
    xAxis: {
      categories: yearArray,
    },
    yAxis: {
      title: {
        text: 'Fruit eaten',
      },
    },
    // 都道府県名と人口が入る
    series: [
      //   {
      //     type: 'line',
      //     name: 'name',
      //     data: [],
      //   },
    ],
  };
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  //   console.log(props.prefArray.map((item) => item));
  return (
    <>
      {/* 何も都道府県が選択されていない時/何か選択された時 */}
      <p>何も選択されていません</p>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartComponentRef}
        {...props}
      />
    </>
  );
};
