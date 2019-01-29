import React from 'react';
import namor from 'namor';

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    year + ' ' + month + ' ' + date + ' ' + hour + ':' + min + ':' + sec;

  return time;
}

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  minimumIntegerDigits: 2
});

export const newPerson = () => {
  return {
    contactName: namor.generate({ words: 1, numbers: 0 }),
    firstName: namor.generate({ words: 1, numbers: 0 }),
    lastName: namor.generate({ words: 1, numbers: 0 }),
    numCalls: Math.floor(Math.random() * 30),
    numMinutes: Math.floor(Math.random() * 50),
    lastCall: timeConverter(Math.floor(Math.random() * 1597779950)),
    totalBilled: formatter.format(Math.floor(Math.random() * 200)),
    totalUnpaid: formatter.format(Math.floor(Math.random() * 20))
  };
};

export const newClient = () => {
  return {
    name: namor.generate({ words: 1, numbers: 0 }),
    email: namor.generate({ words: 1, numbers: 0 }),
    phone:
      Math.floor(Math.random() * 1000) +
      '-' +
      Math.floor(Math.random() * 1000) +
      '-' +
      Math.floor(Math.random() * 10000),
    createdDate: timeConverter(Math.floor(Math.random() * 1597779950))
  };
};

export function makeData(generator, len = 5) {
  return range(len).map(d => {
    return {
      ...generator(),
      children: range(10).map(generator)
    };
  });
}

export const Logo = () => (
  <div
    style={{
      margin: '1rem auto',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    For more examples, visit {''}
    <br />
    <a
      href="https://github.com/react-tools/react-table"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        alt="logo"
        src="https://github.com/react-tools/media/raw/master/logo-react-table.png"
        style={{ width: `150px`, margin: '.5em auto .3em' }}
      />
    </a>
  </div>
);

export const Tips = () => (
  <div style={{ textAlign: 'center' }}>
    <em>Tip: Hold shift when sorting to multi-sort!</em>
  </div>
);
