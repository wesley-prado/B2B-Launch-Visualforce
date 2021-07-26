function mobileCheck() {
  let check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check && (getWidth() <= 760);
};

var brazilianStates = [{
  "name": "Acre",
  "initials": "AC"
}, {
  "name": "Alagoas",
  "initials": "AL"
}, {
  "name": "Amapá",
  "initials": "AP"
}, {
  "name": "Amazonas",
  "initials": "AM"
}, {
  "name": "Bahia",
  "initials": "BA"
}, {
  "name": "Ceará",
  "initials": "CE"
}, {
  "name": "Distrito Federal",
  "initials": "DF"
}, {
  "name": "Espírito Santo",
  "initials": "ES"
}, {
  "name": "Goiás",
  "initials": "GO"
}, {
  "name": "Maranhão",
  "initials": "MA"
}, {
  "name": "Mato Grosso",
  "initials": "MT"
}, {
  "name": "Mato Grosso do Sul",
  "initials": "MS"
}, {
  "name": "Minas Gerais",
  "initials": "MG"
}, {
  "name": "Pará",
  "initials": "PA"
}, {
  "name": "Paraíba",
  "initials": "PB"
}, {
  "name": "Paraná",
  "initials": "PR"
}, {
  "name": "Pernambuco",
  "initials": "PE"
}, {
  "name": "Piauí",
  "initials": "PI"
}, {
  "name": "Rio de Janeiro",
  "initials": "RJ"
}, {
  "name": "Rio Grande do Norte",
  "initials": "RN"
}, {
  "name": "Rio Grande do Sul",
  "initials": "RS"
}, {
  "name": "Rondônia",
  "initials": "RO"
}, {
  "name": "Roraima",
  "initials": "RR"
}, {
  "name": "Santa Catarina",
  "initials": "SC"
}, {
  "name": "São Paulo",
  "initials": "SP"
}, {
  "name": "Sergipe",
  "initials": "SE"
}, {
  "name": "Tocantins",
  "initials": "TO"
}]; // Opera 8.0+

var isOpera = !!window.opr && !!opr.addons || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0; // Firefox 1.0+

var isFirefox = typeof InstallTrigger !== 'undefined'; // Safari 3.0+ "[object HTMLElementConstructor]" 

var isSafari = /constructor/i.test(window.HTMLElement) || function (p) {
  return p.toString() === "[object SafariRemoteNotification]";
}(!window['safari'] || typeof safari !== 'undefined' && window['safari'].pushNotification); // Internet Explorer 6-11


var isIE =
  /*@cc_on!@*/
  false || !!document.documentMode; // Edge 20+

var isEdge = !isIE && !!window.StyleMedia; // Chrome 1 - 79

var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime); // Edge (based on chromium) detection

var isEdgeChromium = isChrome && navigator.userAgent.indexOf("Edg") != -1; // Blink engine detection

var isBlink = (isChrome || isOpera) && !!window.CSS;

var isNotCompatible = isIE || isEdge;

function getWidth() {
  return Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.documentElement.clientWidth);
}

function getHeight() {
  return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.documentElement.clientHeight);
}

function setDocumentPageTitle(title, prefix, sufix) {
  if (title === void 0) {
    title = '';
  }

  if (prefix === void 0) {
    prefix = '';
  }

  if (sufix === void 0) {
    sufix = '';
  }

  document.getElementsByTagName('title')[0].innerHTML = prefix + title + sufix;
}

function insertIntoString(string, insertString, position) {
  if (typeof position == "undefined") {
    position = 0;
  }

  if (typeof insertString == "undefined") {
    insertString = '';
  }

  return string.slice(0, position) + insertString + string.slice(position);
}

function sSize(VAR_text) {
  return VAR_text < 10 ? '0' + VAR_text : VAR_text;
}

function formatDate(date) {
  if (!date) {
    return false;
  }

  if (typeof date == 'string') {
    if (date.indexOf(' ') > -1) {
      date = new Date(date.replace(' ', 'T'));
    } else {
      date = new Date(date + 'T12:00');
    }
  }

  if (typeof date == 'number') {
    date = new Date(date);
    return sSize(date.getUTCDate()) + '/' + sSize(date.getUTCMonth() + 1) + '/' + date.getUTCFullYear();
  }

  return sSize(date.getDate()) + '/' + sSize(date.getMonth() + 1) + '/' + date.getFullYear();
}

function formatDateEN(date) {
  if (typeof date == 'string') {
    if (date.indexOf(' ') > -1) {
      date = new Date(date.replace(' ', 'T'));
    } else {
      date = new Date(date + 'T12:00');
    }
  }

  if (typeof date == 'number') {
    date = new Date(date);
    return sSize(date.getUTCMonth() + 1) + '/' + sSize(date.getUTCDate()) + '/' + date.getUTCFullYear();
  }

  return sSize(date.getMonth() + 1) + '/' + sSize(date.getDate()) + '/' + date.getFullYear();
}

function formatDateCustom(dt, language) {
  if (language === void 0) {
    language = 'pt-br';
  }

  if (!dt) {
    return false;
  }

  if (typeof dt == 'string') {
    if (dt.indexOf(' ') > -1) {
      dt = new Date(dt.replace(' ', 'T'));
    } else {
      dt = new Date(dt + 'T12:00');
    }
  }

  return dt.toLocaleString(language, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function formatDateTimeCustom(dt) {
  dt = normalizeDate(dt);

  if (!dt) {
    return false;
  }

  var currDate = new Date();
  currDate.setHours(12);
  var indexDate = 0;
  var datesList = ['hoje', 'ontem', 'anteontem'];

  while (formatDate(dt) != formatDate(currDate)) {
    currDate.setDate(currDate.getDate() - 1);
    indexDate++;
  }

  if (datesList.length > indexDate) {
    return datesList[indexDate] + ' às ' + formatTime(dt);
  } else if (indexDate < 5) {
    return dt.toLocaleString('pt-br', {
      weekday: 'long'
    }) + ' às ' + formatTime(dt);
  }

  return formatDate(dt) + ' às ' + formatTime(dt);
}

function formatDateForm(date) {
  if (typeof date == 'string') {
    if (date.indexOf(' ') > -1) {
      date = new Date(date.replace(' ', 'T'));
    } else {
      date = new Date(date + 'T12:00');
    }
  }

  if (typeof date == 'number') {
    date = new Date(date);
    return sSize(date.getUTCFullYear()) + '-' + sSize(date.getUTCMonth() + 1) + '-' + sSize(date.getUTCDate());
  }

  return sSize(date.getFullYear()) + '-' + sSize(date.getMonth() + 1) + '-' + sSize(date.getDate());
}

function formatDateFormBr(date) {
  if (typeof date == 'string') {
    if (date.indexOf(' ') > -1) {
      date = new Date(date.replace(' ', 'T'));
    } else {
      date = new Date(date + 'T12:00');
    }
  }

  if (typeof date == 'number') {
    date = new Date(date);
    return sSize(date.getUTCDate()) + '-' + sSize(date.getUTCMonth() + 1) + '-' + sSize(date.getUTCFullYear());
  }

  return sSize(date.getDate()) + '-' + sSize(date.getMonth() + 1) + '-' + sSize(date.getFullYear());
}

function formatPrice(price) {
  if (price == null) {
    price = 0.00;
  }

  if (typeof price == 'string') {
    price = parseFloat(price);
  }

  return price.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  });
}

;

function formatNumber(number, min) {
  if (min === void 0) {
    min = 2;
  }

  if (number == null) {
    number = 0.00;
  }

  if (typeof number == 'string') {
    number = parseFloat(number);
  }

  return number.toLocaleString('pt-br', {
    minimumFractionDigits: min
  });
}

;

async function submitReCaptcha(e, key) {
  if (e) {
    e.preventDefault();
  }
  try {
    return await new Promise(function (resolve, reject) {
      grecaptcha.ready(function () {
        grecaptcha.execute(key, {
          action: 'submit'
        }).then(function (token) {
          resolve(token);
        }).catch(function (e) {
          resolve('byPass');
        });
      });
    });
  } catch (error) {
    return 'byPass';
  }
}

async function createCardToken(card) {
  return await new Promise(function (resolve, reject) {
    EBANX.card.createToken({
      card_number: card.number.replace(/[^0-9]+/g, ''),
      card_name: card.name,
      card_due_date: card.dueDate,
      card_cvv: card.code
    }, function (ebanxResponse) {
      let returnData = {
        data: null,
        hasError: false,
        message: ''
      };
      if (ebanxResponse.data.hasOwnProperty('status')) {
        returnData.data = ebanxResponse.data;
      } else {
        returnData.hasError = true;
        returnData.code = ebanxResponse.error.err.field;
        returnData.message = ebanxResponse.error.err.status_message || ebanxResponse.error.err.message;
      }
      resolve(returnData);
    });
  });
}

function normalizeString(str) {
  if (str == null || typeof str == 'undefined') return '';
  if (typeof str != 'string') str = str.toString();
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ /g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
}

function callRemoteAction(remoteAction, params, callback) {
  try {
      const r = function (result, event) {
          callback(result, event);
      }
      const l = {
          buffer: false,
          escape: false,
          timeout: 300000
      };
      params ? Visualforce.remoting.Manager.invokeAction(remoteAction, params, r, l) : Visualforce.remoting.Manager.invokeAction(remoteAction, r, l);
  } catch (e) {
      callback(null, e);
  }
}