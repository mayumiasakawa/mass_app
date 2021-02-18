(function(d) {
  var config = {
    kitId: 'yta1juh',
    scriptTimeout: 3000,
    async: true
  },
  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);

const setFillHeight = () => {
const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
}

let vw = window.innerWidth;

window.addEventListener('resize', () => {
if (vw === window.innerWidth) {
　// 画面の横幅にサイズ変動がないので処理を終える
  return;
}

// 画面の横幅のサイズ変動があった時のみ高さを再計算する
vw = window.innerWidth;
setFillHeight();
});

// 初期化
setFillHeight();

window.addEventListener("DOMContentLoaded", () => {
const drawer = document.getElementById("accordionSidebar");

new DrawerMenu(drawer);
new PrepareCurrent(drawer);
});

class DrawerMenu {
constructor(root, options) {
  this.root = root;
  if (!this.root) return;

  const defaultOptions = {
    openTriggerSelector: ".js-menu-open-trigger", // メニューを開く際のターゲットとなるセレクタ
    closeTriggerSelector: ".js-menu-close-trigger", // メニューを閉じる際のターゲットとなるセレクタ
    inertTargetSelector: '[data-inert-target="menu"]', // 開いている時はこのセレクタを読み上げ対象外にする。
    clickLinkToClose: true, // メニュー内のリンクをクリック時にメニューを閉じるか
    toggleDuration: 500 // メニューの遷移時間
  };

  const mergedOptions = Object.assign(defaultOptions, options);
  this.options = mergedOptions;

  /**
   * メニューを開くトリガーとなるセレクタの設定
   */
  this.openTrigger = document.querySelector(this.options.openTriggerSelector);
  if (!this.openTrigger)
    throw TypeError("メニューを開く要素が見つかりません");

  /**
   * ボタンとは別にメニューを閉じるトリガーとなるセレクタの設定
   * メニュー内のリンクをクリック時にメニューを閉じる設定をしている場合はメニュー内のa要素をクリック時にもメニューを閉じる
   */
  this.closeTrigger = document.querySelectorAll(
    this.options.closeTriggerSelector
  );

  /**
   * メニュー内のリンクをクリック時にメニューを閉じる設定をしている場合はメニュー内のa要素をクリック時にもメニューを閉じる
   */
  this.innerLink = this.root.querySelectorAll("a:not(.js-ignore-target)");

  /**
   * メニューが開かれている際に読み上げ対象外とするセレクタの指定
   */
  this.inertTarget = document.querySelectorAll(
    this.options.inertTargetSelector
  );
  if (!this.inertTarget.length)
    throw TypeError("inert対象のセレクタの指定は必須です");

  /**
   * 状態を格納する変数
   */
  this.isExpanded = false; // メニューの開閉状態を格納する

  /**
   * 初期化時に属性を付与
   */
  this.prepareAttributes();

  /**
   * イベントハンドラの設定
   */
  this.openTriggerHandler = this.handleOpenTriggerClick.bind(this);
  this.closeTriggerHandler = this.handleCloseTriggerClick.bind(this);
  this.innerLinkHandler = this.handleInnerLinkClick.bind(this);
  this.keyupHandler = this.handleKeyup.bind(this);

  attachEvent(this.openTrigger, "click", this.openTriggerHandler);
}

prepareAttributes() {
  this.root.setAttribute("inert", "");
  this.root.setAttribute("tabindex", "-1");
  this.root.style.display = "none";

  this.openTrigger.setAttribute("aria-haspopup", true);

  document.documentElement.style.setProperty(
    "--menu-toggle-duration",
    `${this.options.toggleDuration}ms`
  );
}

handleOpenTriggerClick(event) {
  event.preventDefault;
  this.open();
}

handleCloseTriggerClick(event) {
  event.preventDefault;
  this.close();
}

handleInnerLinkClick(event) {
  this.close();
}

handleKeyup(event) {
  if (event.key === "Escape" || event.key === "Esc") this.close();
}

open() {
  // メニューの`display:none`を削除
  this.root.style.display = "";
  // Esc押下時イベントを追加
  attachEvent(document, "keyup", this.keyupHandler);
  // 開くボタンクリック時のイベントを削除
  attachEvent(
    this.openTrigger,
    "click",
    this.openTriggerHandler
  ).unsubscribe();
  // 閉じるボタンクリック時のイベントを追加
  this.closeTrigger.forEach((trigger) => {
    attachEvent(trigger, "click", this.closeTriggerHandler);
  });
  // メニュー内リンククリック時のイベントを削除
  if (this.options.clickLinkToClose) {
    this.innerLink.forEach((link) => {
      attachEvent(link, "click", this.innerLinkHandler);
    });
  }

  this.backfaceFixed(true);
  this.changeAttribute(true);

  setTimeout(() => {
    this.root.focus();
    this.isExpanded = true;
  }, 100);
}

close() {
  // Esc押下時のイベントを削除
  attachEvent(document, "keyup", this.keyupHandler).unsubscribe();
  // 閉じるボタンクリック時のイベントを削除
  this.closeTrigger.forEach((trigger) => {
    attachEvent(trigger, "click", this.closeTriggerHandler).unsubscribe();
  });
  // メニュー内リンククリック時のイベントを削除
  if (this.options.clickLinkToClose) {
    this.innerLink.forEach((link) => {
      attachEvent(link, "click", this.innerLinkHandler).unsubscribe();
    });
  }

  this.backfaceFixed();
  this.changeAttribute();

  setTimeout(() => {
    // 開くボタンクリック時のイベントを再登録
    attachEvent(this.openTrigger, "click", this.openTriggerHandler);
    // メニューに`hidden`を付与
    this.root.style.display = "none";
    // 開くボタンにフォーカスを移動
    this.openTrigger.focus();

    this.isExpanded = false;
  }, this.options.toggleDuration);
}

changeAttribute(expanded) {
  if (expanded) {
    this.root.removeAttribute("inert");
    this.openTrigger.setAttribute("inert", "");
  } else {
    this.root.setAttribute("inert", "");
    this.openTrigger.removeAttribute("inert");
  }

  this.inertTarget.forEach((element) => {
    if (expanded) {
      element.setAttribute("inert", "");
    } else {
      element.removeAttribute("inert");
    }
  });
}

backfaceFixed(fixed) {
  /**
   * 表示されているスクロールバーとの差分を計測し、背面固定時はその差分body要素に余白を生成する
   */
  const scrollbarWidth = window.innerWidth - document.body.clientWidth;
  document.body.style.paddingRight = fixed ? `${scrollbarWidth}px` : "";

  /**
   * 背面固定する対象を決定する
   */
  const scrollingElement = () => {
    const browser = window.navigator.userAgent.toLowerCase();
    // document.scrollingElementが有効なブラウザの場合
    if ("scrollingElement" in document) return document.scrollingElement;
    // document.scrollingElementが無効なiOSの場合はbody要素を
    if (browser.indexOf("webkit") > 0) return document.body;
    // その他（IEとか）はhtml要素を
    return document.documentElement;
  };

  /**
   * 背面固定時に変数にスクロール量を格納
   */
  const scrollY = fixed
    ? scrollingElement().scrollTop
    : parseInt(document.body.style.top || "0");

  /**
   * CSSで背面を固定
   */
  const styles = {
    height: "100%",
    left: "0",
    overflow: "hidden",
    position: "fixed",
    top: `${scrollY * -1}px`,
    width: "100%"
  };

  Object.keys(styles).forEach((key) => {
    document.body.style[key] = fixed ? styles[key] : "";
  });

  /**
   * 背面固定解除時に元の位置にスクロールする
   */
  if (!fixed) window.scrollTo(0, scrollY * -1);
}
}

function attachEvent(element, event, handler, options) {
element.addEventListener(event, handler, options);
return {
  unsubscribe() {
    element.removeEventListener(event, handler);
  }
};
}

class PrepareCurrent {
constructor(root, options) {
  this.root = root;
  if (!this.root) return;

  const defaultOptions = {
    level: 1,
    ignoreSelector: ".js-ignore-set-current"
  };

  const mergedOptions = Object.assign(defaultOptions, options);
  this.options = mergedOptions;

  this.targets = this.root.querySelectorAll(
    `a:not(${this.options.ignoreSelector})`
  );

  this.targets.forEach((target) => {
    this.setCurrentLocation(target, this.options.level);
    this.setCurrentPage(target);
  });
}

setCurrentLocation(target, level) {
  const paths = this.getRootAbsolutePath(
    this.convertHrefToRootAbsolutePath(target)
  );

  const matchedPath = paths.map((path, index) => {
    if (index <= level - 1) {
      return `${path}/`;
    }
    return null;
  });

  const directories = this.getRootAbsolutePath(window.location.pathname);
  const matchedDirectory = directories.map((directory, index) => {
    if (index <= level - 1) {
      return `${directory}/`;
    }
    return null;
  });

  const directory = `/${matchedDirectory.join("")}`;
  const href = `/${matchedPath.join("")}`;

  if (href === directory && href !== "//") {
    target.setAttribute("aria-current", "location");
  }
}

setCurrentPage(target) {
  const path = this.convertHrefToRootAbsolutePath(target);
  const locationPathname = window.location.pathname.replace(
    /index\.html$/,
    ""
  );

  if (path === locationPathname) {
    target.setAttribute("aria-current", "page");
  }
}

convertHrefToRootAbsolutePath(target) {
  const absolutePath =
    target instanceof HTMLElement ? target.href : target.href.baseVal;
  const protocolHost = `${window.location.protocol}//${window.location.host}`;

  return absolutePath.replace(protocolHost, "").replace(/index\.html$/, "");
}

getRootAbsolutePath(absolutePath) {
  return absolutePath
    .replace(/\\/g, "/")
    .replace(/\/[^/]*$/, "")
    .slice(1)
    .split("/");
}
}

