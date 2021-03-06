import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Pagination } from "./pagination-utility";

@Injectable({
  providedIn: "root",
})
export class FunctionUtility {
  /**
   *Hàm tiện ích
   */

  constructor() { }

  /**
   *Trả ra ngày hiện tại, chỉ lấy năm tháng ngày: yyyy/MM/dd
   */
  getToDay() {
    const toDay =
      new Date().getFullYear().toString() +
      "/" +
      (new Date().getMonth() + 1).toString() +
      "/" +
      new Date().getDate().toString();
    return toDay;
  }

  /**
   *Trả ra ngày với tham số truyền vào là ngày muốn format, chỉ lấy năm tháng ngày: yyyy/MM/dd
   */
  getDateFormat(date: Date) {
    return (
      date.getFullYear() +
      "/" +
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      "/" +
      (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
    );
  }

  getUTCDate(d?: Date) {
    let date = d ? d : new Date();
    return new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
      )
    );
  }

  /**
   * Convert input date to date without time
   * @param date
   * @returns Date
   */
  returnDayNotTime(date: Date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));
  }

  returnDayNotTimeOfString(date: string) {
    var a = new Date(date.substr(0, 4) + '/' + date.substr(5, 2) + '/' + date.substr(8, 2));

    return new Date(Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), 0, 0, 0));
  }

  /**
   * Nhập vào kiểu chuỗi hoặc số dạng 123456789 sẽ trả về 123,456,789
   */
  // convertNumber(amount) {
  //   return String(amount).replace(
  //     /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
  //     "$1,"
  //   );
  // }

  /**
   * Check 1 string có phải empty hoặc null hoặc undefined ko.
   */
  checkEmpty(str: any) {
    return !str || /^\s*$/.test(str);
  }

  /**
   * Kiểm tra số lượng phần ở trang hiện tại, nếu bằng 1 thì cho pageNumber lùi 1 trang
   * @param pagination
   */
  calculatePagination(pagination: Pagination) {
    // Kiểm tra trang hiện tại phải là trang cuối không và trang hiện tại không phải là trang 1
    if (
      pagination.pageNumber === pagination.totalPage &&
      pagination.pageNumber !== 1
    ) {
      // Lấy ra số lượng phần tử hiện tại của trang
      let currentItemQty =
        pagination.totalCount -
        (pagination.pageNumber - 1) * pagination.pageSize;

      // Nếu bằng 1 thì lùi 1 trang
      if (currentItemQty === 1) {
        pagination.pageNumber--;
      }
    }
  }

  /**
   * Thêm hoặc xóa class tác động vào id element trên DOM
   * * @param id
   * * @param className
   * * @param type => Value bằng true thì add class. Value bằng false thì xóa class
   */
  // changeDomClassList(id: string, className: string, type: boolean) {
  //   type
  //     ? document.getElementById(id).classList.add(className)
  //     : document.getElementById(id).classList.remove(className);
  // }

  /**
   * Append property FormData
   * If property type Date => Convert value to String
   * * @param formValue
   */
  ToFormData(formValue: any) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return formData;
  }

  /**
   * Append property HttpParams
   * * @param formValue
   */
  ToParams(formValue: any) {
    let params = new HttpParams();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      params = params.append(key, value);
    }
    return params;
  }

  /**
   * Append property HttpParams
   * * @param value role_unique
   */
  convertUrlMenu(str: string): string {
    if (str.trim() === 'ams.SPCSettingByDevice') {
      return '/spcsetting';
    }
    let strName = str.split('.')[1];
    let indexUppercase: number[] = [];
    let result: string[] = [];
    strName.split('').forEach((item, i) => {
      if (item.toUpperCase() === item) {
        indexUppercase.push(i);
      }
    });

    for (let i = 0; i <= indexUppercase.length - 1; i++) {
      let item = strName.slice(indexUppercase[i], indexUppercase[i + 1]);
      result.push(item);
    }

    return `/${result.join('-').toLowerCase()}`;

  }

  /**
  * Append property HttpParams
  * * @param str str
  * * Viết Hoa chữ cái đầu tiên trong chuỗi
  */
  toUpperCaseFirst(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  getTime(date: Date): string {
    const hours = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours();
    const minutes = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes();
    const seconds = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
  }

  dateNotTimeSecond(date: Date) {
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:00`;
  }
}
