function create(ele) {
  return document.createElement(ele);
}

function $(ele, all = false) {
  return all ? document.querySelectorAll(ele) : document.querySelector(ele);
}

function createFilePath(path) {
  const origin = window.location.origin;
  if (origin.startsWith('http')) {
    path = origin + '/' + path;
    return path;
  } else {
    const windowHref = window.location.href;
    path = windowHref.substring(0, windowHref.indexOf('InnisFree') + 'InnisFree'.length) + '/' + path;
    return path;
  }
}

function importScript(path) {
  const script = create('script');
  script.src = createFilePath(path);
  return script;
}

function on(type, ele, callback) {
  typeof ele === 'object' ? ele.addEventListener(type, callback) : $(ele).addEventListener(type, callback);
}
