var defaultErrorMessage = 'Algo deu errado, tente novamente. Se o problema persistir, contate um Administrador do Sistema.';
var Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 6500
});

function Log() {
  defaultErrorMessage = window.LABEL.B2B_DEFAULT_ERROR_MSG;
  this.ex = null;
  this.opt = null;
  this.instanceLog = this;

  this.sendErrorLog = function () {
    this.ex.code = this.opt.code;
    swal.close();
    callMixinsAlertRemoteAction(window.URL['LOG_reportError'], JSON.stringify(this.ex), function (result, event) {
      if (event) {
        if (!result.hasError) {
          Toast.fire({
            timer: 3000,
            type: 'success',
            title: window.LABEL.B2B_ERROR_SEND_MSG_FEEDBACK
          });
        } else {
          Log.fire(result, {
            code: '994'
          });
        }
      } else {
        Log.fire(result, {
          code: '998'
        });
      }
    });
  };

  this.showErrorMessage = function (ex, opt) {
    if (typeof ex == 'undefined') {
      ex = {
        message: defaultErrorMessage,
        stackTrace: null
      };
    }

    if (ex == null) {
      ex = {
        message: defaultErrorMessage,
        stackTrace: null
      };
    }

    if (typeof ex == 'string') {
      ex = {
        message: ex
      };
    }

    if (!ex.hasOwnProperty('message')) {
      if (ex.hasOwnProperty('errorMessage')) {
        ex.message = ex.errorMessage;
      }
    }

    if (!ex.hasOwnProperty('message') || !ex.message) {
      ex.message = defaultErrorMessage;
    }

    if (typeof ex.stackTrace == 'undefined') {
      ex.stackTrace = null;
    }

    if (typeof opt == 'undefined') {
      opt = {};
    }

    if (typeof opt.type == 'undefined') {
      opt.type = 'warning';
    }

    if (typeof opt.title == 'undefined') {
      opt.title = window.LABEL.B2B_ERROR_POPUP_DEFAULT_TITLE;
    }

    if (typeof opt.code == 'undefined') {
      opt.code = null;
    }

    if (typeof opt.open == 'undefined') {
      opt.open = false;
    }

    if (typeof opt.confirmText == 'undefined') {
      opt.confirmText = window.LABEL.B2B_POPUP_DEFAULT_ACCEPT;
    }

    if (typeof opt.callback == 'undefined') {
      opt.callback = function (params) {};
    }

    this.ex = ex;
    this.opt = opt;
    var html = ex.message + ' <br/>';
    var time = new Date().getTime();

    if (ex.stackTrace != null) {
      html += '' + ("\n                <div class=\"log collapsible left\">\n                   <input type=\"checkbox\" id=\"log-code-" + time + "\" " + (opt.open ? 'checked="true"' : '') + " />\n                   <div class=\"collapsible-header\">\n                       <label for=\"log-code-" + time + "\">\n                           <svg class=\"slds-button__icon collapsible-down\" aria-hidden=\"true\">\n                               <use xlink:href=\"/apexpages/slds/latest/assets/icons/utility-sprite/svg/symbols.svg#chevrondown\"></use>\n                           </svg>\n                           <svg class=\"slds-button__icon collapsible-up\" aria-hidden=\"true\">\n                               <use xlink:href=\"/apexpages/slds/latest/assets/icons/utility-sprite/svg/symbols.svg#chevronup\"></use>\n                           </svg>\n                           <small>" + (opt.code != null ? 'CODE: [' + opt.code + ']' : window.LABEL.B2B_ERROR_POPUP_LABEL_SHOW_DETAILS) + "</small>\n                       </label>\n                   </div>\n                   <div class=\"collapsible-body\"><pre>" + ex.stackTrace + "</pre> ") + (window.URL['LOG_reportError'] ? "<a onclick=\"Log.sendErrorLogWrapper(" + opt.code + ")\">" + window.LABEL.B2B_ERROR_POPUP_BUTTON_REPORT + "</a>" : "") + "</div>\n                </div>\n            ";
    } else if (opt.code != null) {
      html += '' + ("\n                <div class=\"collapsible\">\n                   <div class=\"collapsible-header\">\n                       <label for=\"log-code-" + time + "\">\n                           <small>CODE: [" + opt.code + "]</small>\n                       </label>\n                   </div>\n                </div>\n            ");
    }

    Swal.fire({
      type: opt.type,
      title: opt.title,
      html: html,
      confirmButtonText: opt.confirmText
    }).then(function (result) {
      opt.callback(result);
      delete LogMap[opt.code];
    });
  };
}

var LogMap = {};

Log.fire = function (ex, opt) {
  if (typeof opt.code == 'undefined') {
    opt.code = null;
  }

  LogMap[opt.code] = new Log();
  LogMap[opt.code].showErrorMessage(ex, opt);
};

Log.sendErrorLogWrapper = function (code) {
  LogMap[code].sendErrorLog();
};

function callMixinsAlertRemoteAction(remoteAction, params, callback) {
  Visualforce.remoting.Manager.invokeAction(remoteAction, params, function (result, event) {
    callback(result, event);
  }, {
    buffer: false,
    escape: true,
    timeout: 300000
  });
}

window.Log = Log;
window.Toast = Toast;