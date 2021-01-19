import _ from "lodash";
require("round10").polyfill();

function FormatNumber(nStr) {
  nStr = nStr === undefined || Number.isNaN(Number(nStr)) ? "" : nStr;
  nStr = Math.round10(nStr, -5);
  nStr += "";
  var x = nStr.split(".");
  var x1 = x[0];
  var x2 = x.length > 1 ? "." + x[1] : "";

  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1,$2");
  }
  return x1 + x2;
};

function validateEmail(inputText) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/;
  if (inputText.match(mailformat)) {
    return true;
  } else {
    return false;
  }
};

function removeSign(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o"); //ò đầu tiên là ký tự đặc biệt
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  return str;
}

function isValid(string) {
  var re = /^[a-zA-Z!@#\$%\^\&*\)\(+=._-]{2,}$/g; // regex here
  return re.test(removeSign(string));
}

function validateMobile(phone) {
  let flag = false;
  phone = phone.replace("(+84)", "0");
  phone = phone.replace("+84", "0");
  phone = phone.replace("0084", "0");
  phone = phone.replace(/ /g, "");
  if (phone != "") {
    let vnf_regex = /((09|03|07|08|05|04)+([0-9]{8})\b)/g;
    if (vnf_regex.test(phone) == true && phone.length == 10) {
      flag = true;
    }
  }
  return flag;
}

// Format Input Number
const locale = "en-us";
const currencyFormatter = (selectedCurrOpt) => (value) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: selectedCurrOpt.split("::")[1],
  }).format(value);
};

const currencyParser = (val) => {
  try {
    if (typeof val === "string" && !val.length) {
      val = "0.0";
    }
    var group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, "");
    var decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, "");
    var reversedVal = val.replace(new RegExp("\\" + group, "g"), "");
    reversedVal = reversedVal.replace(new RegExp("\\" + decimal, "g"), ".");
    reversedVal = reversedVal.replace(/[^0-9.]/g, "");
    const digitsAfterDecimalCount = (reversedVal.split(".")[1] || []).length;
    const needsDigitsAppended = digitsAfterDecimalCount > 2;

    if (needsDigitsAppended) {
      reversedVal = reversedVal * Math.pow(10, digitsAfterDecimalCount - 2);
    }

    return Number.isNaN(reversedVal) ? 0 : reversedVal;
  } catch (error) {
    console.error(error);
  }
};

function getBase64(file) {
  if (file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
}

export const removeUnicode = str => {
  return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')
            .replace(/[^a-zA-Z0-9 ]/g, '');
};

export const exportExcel = file => {
  const url = window.URL.createObjectURL(
    new Blob([file])
  );
  const link = document.createElement("a");
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  link.href = url;
  link.setAttribute("download", "Report_" + year + month + date + ".xlsx"); //or any other extension
  document.body.appendChild(link);
  link.click();
}

export const exportPdf = file => {
  const url = window.URL.createObjectURL(new Blob([file], { type: 'application/pdf' }));
    const link = document.createElement('a');
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    link.href = url;
    // link.setAttribute('download', 'Report_' + year + month + date + '.xlsx'); //or any other extension
    link.setAttribute('target', '_blank'); //or any other extension
    document.body.appendChild(link);
    link.click();
}

export const clearArray = value => {
  const types = {
    string: v => !!v,
    object: v => v && (
        Array.isArray(v) ? v : Object.keys(v)
    ).length,
    number: v => !Number.isNaN(v),
  }
  return types?.[typeof value]?.(value) ?? value;
};

export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

export const generatePathQuery = (path, obj) =>
path +
Object.entries(obj)
  .reduce((total, [k, v]) => (total += `${k}=${encodeURIComponent(v)}&`), "?")
  .slice(0, -1);

export const getQueryParams = url =>
  url.match(/([^?=&]+)(=([^&]*))/g).reduce((total, crr) => {
    const [key, value] = crr.split("=");
    total[key] = value;
    return total;
  }, {});

export const getMenuFromLocalStorage = (lsJson) => {
  const userMenu = JSON.parse(lsJson);
  let arrayParent = [];
  userMenu.map(item => { 
    let arrayChildren = [];

    if (item.children) {
      item.children.map( x => {
        let teampChirent = { 
          name: x.name, 
          icon: 'user', 
          url: x.url 
        }
        arrayChildren.push(teampChirent);
      });
    }


    let temp = {
      icon: item.icon,
      name: item.name,
      children: arrayChildren
    };
    arrayParent.push(temp)
  });
  return arrayParent;
}

export const parseToMenu = (menus, roleId) => {
  menus = menus || [];
  
  if (roleId === 1) return navigation.items; // admin

  const newMenus = [];

  for (let i = 0; i < menus.length; i++) {
    let menu = {
      id: menus[i].id,
      name: menus[i].title,
      icon: menus[i].icon,
      url: menus[i].path,
      children: [],
    }

    if (menus[i].level) {
      // const idx = newMenus.indexOf({ id: menus.parent_id });
      // delete menu.children;
      const idx = newMenus.indexOfPropValue('id', menus[i].parent_id);
      if (idx !== -1) {
        newMenus[idx].children.push({
          name: menus[i].title,
          icon: menus[i].icon,
          url: menus[i].path,
        });
      }
    } else {
      newMenus.push(menu);
    }
  }

  newMenus.map(menu => {
    if (menu.children.length <= 0) {
      delete menu.children;
    }
    return menu
  })

  return newMenus;
};

export const convertArrayToObject = (array = [], key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};

export const convertArrayToObject = (array = [], key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};

export const removeUnicode = str => {
  return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')
            .replace(/[^a-zA-Z0-9 ]/g, '');
};
export const formatVND = str => {
  return (str + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',').replace(/[a-zA-Z]/, '') + 'đ';
};
export const getAddressString = (a, w, d, p) => {
  let ret = '';
  ret += `${a ? a + ', ' : ''}`;
  ret += `${w ? w + ', ' : ''}`;
  ret += `${d ? d + ', ' : ''}`;
  ret += `${p ? p + ', ' : ''}`;
  return ret.replace(/,$/, '').replace(/, $/, '');
}

export default {
  FormatNumber,
  validateEmail,
  removeSign,
  validateMobile,
  currencyFormatter,
  currencyParser,
  isValid,
  getBase64,
  removeUnicode,
  exportExcel,
  exportPdf,
};
