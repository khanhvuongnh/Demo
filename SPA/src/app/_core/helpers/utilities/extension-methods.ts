declare global {
  interface Date {
    toDate(): Date;
    toUTCDate(): Date;
    toStringTime(): string;
    toStringDate(): string;
    toStringDateFormat(format: string): string;
    toStringDateTime(): string;
    toStringYearMonth(): string;
    toFirstDateOfMonth(): Date;
    toLastDateOfMonth(): Date;
    toFirstDateOfYear(): Date;
    toLastDateOfYear(): Date;
    toBeginDate(): Date;
    toEndDate(): Date;
  }

  interface String {
    toDate(): Date;
    toUTCDate(): Date;
    toDateFromTime(): Date;
  }

  interface Number {
    toStringLeadingZeros(targetLength: number): string;
  }
}

Date.prototype.toDate = function (): Date {
  const _this = this as string;
  return new Date(_this);
}

Date.prototype.toUTCDate = function (): Date {
  const _this = this as Date;
  return new Date(Date.UTC(
    _this.getFullYear(),
    _this.getMonth(),
    _this.getDate(),
    _this.getHours(),
    _this.getMinutes(),
    _this.getSeconds(),
    _this.getMilliseconds()));
}
//dd-mm-yyyy => 21-12-2019
//yyyy-mm-dd => 2019-12-21
Date.prototype.toStringDate = function (): string {
  const _this = this as Date;

  const year = _this.getFullYear();
  const month = (_this.getMonth() + 1).toStringLeadingZeros(2);
  const date = _this.getDate().toStringLeadingZeros(2);
  //output 


  return `${year}/${month}/${date}`;
}
//dd-mm-yyyy => 21-12-2019
//yyyy-mm-dd => 2019-12-21
Date.prototype.toStringDateFormat = function (format: string): string {
  const _this = this as Date;

  const year = _this.getFullYear().toString();
  const month = (_this.getMonth() + 1).toStringLeadingZeros(2);
  const date = _this.getDate().toStringLeadingZeros(2);

  let result = format.replace(/dd/g, date).replace(/mm/g, month).replace(/yyyy/g, year);
  return result;



  // //output
  // let charater = format.split('')
  //   .filter(x => !['d', 'm', 'y'].includes(x))
  //   .shift() as string;
  // let arr = format.split(charater)
  //   .map(x => [...new Set(x.split(''))][0]);
  // let dateObject = {
  //   d: `${date}`,
  //   m: `${month}`,
  //   y: `${year}`
  // }
  // let t = arr[0] + '';
  // let result = arr.map(x => {
  //   if (x === 'd') {
  //     return dateObject['d'];
  //   } else if (x === 'm') {
  //     return dateObject['m'];
  //   } else {
  //     return dateObject['y'];
  //   }
  // }).join(charater);
}






Date.prototype.toStringTime = function (): string {
  const _this = this as Date;
  const hours = _this.getHours().toStringLeadingZeros(2);
  const minutes = _this.getMinutes().toStringLeadingZeros(2);
  const seconds = _this.getSeconds().toStringLeadingZeros(2);
  return `${hours}:${minutes}:${seconds}`;
}

Date.prototype.toStringDateTime = function (): string {
  const _this = this as Date;
  const year = _this.getFullYear();
  const month = (_this.getMonth() + 1).toStringLeadingZeros(2);
  const date = _this.getDate().toStringLeadingZeros(2);
  const hours = _this.getHours().toStringLeadingZeros(2);
  const minutes = _this.getMinutes().toStringLeadingZeros(2);
  const seconds = _this.getSeconds().toStringLeadingZeros(2);
  return `${year}/${month}/${date} ${hours}:${minutes}:${seconds}`;
}

Date.prototype.toStringYearMonth = function (): string {
  const _this = this as Date;
  const year = _this.getFullYear();
  const month = (_this.getMonth() + 1).toStringLeadingZeros(2);
  return `${year}/${month}`;
}

Date.prototype.toFirstDateOfMonth = function (): Date {
  const _this = this as Date;
  return new Date(_this.getFullYear(), _this.getMonth(), 1);
}

Date.prototype.toLastDateOfMonth = function (): Date {
  const _this = this as Date;
  return new Date(_this.getFullYear(), _this.getMonth() + 1, 0);
}

Date.prototype.toFirstDateOfYear = function (): Date {
  const _this = this as Date;
  return new Date(_this.getFullYear(), 0, 1);
}

Date.prototype.toLastDateOfYear = function (): Date {
  const _this = this as Date;
  return new Date(_this.getFullYear(), 11, 31);
}

Date.prototype.toBeginDate = function (): Date {
  const _this = this as Date;
  _this.setHours(0, 0, 0);
  return _this;
}

Date.prototype.toEndDate = function (): Date {
  const _this = this as Date;
  _this.setHours(23, 59, 59);
  return _this;
}

String.prototype.toDate = function (): Date {
  const _this = this as string;
  return new Date(_this);
}

String.prototype.toUTCDate = function (): Date {
  const _this = this as string;
  return _this.toDate().toUTCDate();
}

String.prototype.toDateFromTime = function (): Date {
  const _this = this as string;
  let today = new Date().toStringDate();
  return new Date(today + ' ' + _this);
}

Number.prototype.toStringLeadingZeros = function (targetLength: number): string {
  const _this = this as number;
  return String(_this).padStart(targetLength, '0');
}

export { };
