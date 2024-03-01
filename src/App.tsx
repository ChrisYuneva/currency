import React, { useEffect, useState } from 'react';
import { ReactECharts } from './Echarts/ReactECharts';
import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';
import { Text } from '@consta/uikit/Text';
import styles from './index.module.css';
import { CurrencyItem, currencyItem, mockData, InterfaceMockData } from './data';

function App() {
  /**
   * Текущая валюта
   */
  const [currency, setCurrency] = useState<CurrencyItem>(currencyItem[0]);
  /**
   * Датасет для чарта
   */
  const [dataset, setDataset] = useState<InterfaceMockData[]>([]);

  /**
   * Фильтрация моковых данных по доллару при изменине валюты (доллар выбран по умолчанию)
   */
  useEffect(() => {
    setDataset(mockData.reduce((prevValue: InterfaceMockData[], currencyValue) => {
      if (currencyValue.indicator === currency.text) {
        prevValue.push(currencyValue);
      }

      return prevValue;
    }, []));
  }, [currency]);
  
  /**
   * Получение среднего значения за указанный период
   * @returns number
   */
  function getAverageValue() {
    return (dataset.reduce((prev, curr) => prev + curr.value, 0) / dataset.length).toFixed(1);
  }

  /**
   * Получение минимального значения на графике
   * @returns number
   */

  function getMinValue() {
    console.log(dataset);
    const sortedDataSet = dataset.sort((a, b) => a.value-b.value);
    if(sortedDataSet.length) {
      return sortedDataSet[0].value;
    }

    return 0;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
      <Text 
        view='primary' 
        size='xl' 
        weight='bold'
        transform='uppercase'
      >
          {currency.text}, {currency.value}/&#8381;
      </Text>          
        <ChoiceGroup
          value={currency}
          onChange={(item) => setCurrency(item.value)}
          size="l"
          items={currencyItem}
          getItemLabel={(item) => item.value}
          multiple={false}
          name="currencyChoiseGroup"
        />
      </div>
      <div className={styles.chart}>
        <ReactECharts
          option={{
            xAxis: {

              type: 'category',
              data: dataset.map((item) => item.month),
            },
            yAxis: {
              type: 'value',
              min: getMinValue() 
            },
            series: [
              {
                data: dataset.map((item) => item.value),
                type: 'line',
                name: currency.text ?? '',
                lineStyle: {
                  color: '#F38B00',
                  width: 2,
                },
                showSymbol: false,
                itemStyle: {
                  color: '#F38B00',
                },
              },
            ],
            tooltip: {
              trigger: 'axis',
              align: 'center',
              verticalAlign: 'top',
              borderRadius: 4,
              formatter: (values) => {
                if (Array.isArray(values) && values.length) {
                  const { name, seriesName, value, marker } = values[0];

                  return `
                    <b>${ name }</b> <br />
                    ${ marker } ${ seriesName } <b>${value} \u20BD</b>
                  `
                }

                return '';
              }
            },
          }}
          style={{height: '500px'}}
        />
        <div className={ styles.average }>
          <Text view='secondary' size='l'>Среднее за период</Text>
          <div className={ styles.number }>
            <Text size='4xl' view="warning">{getAverageValue()}</Text>
            <Text view='secondary' size='l'>&#8381;</Text>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
