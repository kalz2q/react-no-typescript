import './App.css';
// this is no-typescript


function App() {

  const jsonArray = csv2json(originalData);

  return (
    <div className="App">
      <h1>csv2json実験</h1>
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
    </div>
  );
}

const originalData = `
上の句, 下の句
あさぼらけう "あらわれわたる"
あきのたの, わがころもでは
`
// type Item = {
//   "id": number;
//   "上の句": string;
//   "下の句": string
// }

const csv2json = (csvData) => {
  let csvLines = csvData.split('\n').filter(Boolean); // 行ごとに分割する
  const keyNames = csvLines[0].split(/[\n\s\"\',;.]+/); // [ '上の句', ' 下の句' ]
  let jsonArray = [];
  for (let i = 1; i < csvLines.length; i++) { // 0行目は見出しに使ったので1行目から
    let a_line = new Object();
    let csvArrayData = csvLines[i].split(/[\n\s\"\',;.]+/); // [ 'あさぼらけ', ' あらわれわたる' ]
    a_line['id'] = i;
    for (let j = 0; j < keyNames.length; j++) {
      a_line[keyNames[j]] = csvArrayData[j];
    }
    jsonArray.push(a_line);
  }

  return jsonArray;
}
export default App;
