import React from 'react';
import './App.css';
// [Tips] JavaScriptでCSVを読み込んでJSONを作る
// JavaScriptでCSVデータ(項目行あり)をJSON形式に変換する

function App() {

  const jsonArray = csv2json(originalData);


  return (
    <div className="App">
      <ul>
        {jsonArray.map((v) => {
          return (
            <li
              key={v["id"]}
            >
              <p>id: {v.id} </p>
              <p>上の句: {v.上の句}  </p>
              <p>下の句: {v.下の句} </p>
            </li>
          );
        })}
      </ul>
    </div >
  );
}

const originalData = `
上の句, 下の句
あさぼらけう "あらわれわたる"
あきのたの, わがころもでは
`

const csv2json = (csvData: string) => {
  let csvLines = csvData.split('\n').filter(Boolean); // 行ごとに分割する
  const keyNames = csvLines[0].split(/[\n\s,;.]+/); // [ '上の句', ' 下の句' ]

  type Item = {
    "id": number;
    "上の句": string;
    "下の句": string
  }

  let jsonArray = [];

  for (let i = 1; i < csvLines.length; i++) { // 0行目は見出しに使ったので1行目から
    let a_line: Item = { id: 0, "上の句": "", "下の句": "" };
    let csvArrayData = csvLines[i].split(/[\n\s\"\',;.]+/); // [ 'あさぼらけ', ' あらわれわたる' ]
    a_line['id'] = i;
    for (let j = 0; j < keyNames.length; j++) {
      if (j === 0) a_line['上の句'] = csvArrayData[j]
      else a_line['下の句'] = csvArrayData[j]
    }
    jsonArray.push(a_line);
  }
  return jsonArray;
}

export default App;
