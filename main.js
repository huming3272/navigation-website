const $setItem = $(".setItem");
const $lastLi = $setItem.find("li.last");
let hashMap = JSON.parse(localStorage.getItem("url")) || [
  {
    logo: "A",
    logoType: "text",
    url: "https://www.acfun.cn",
  },
  {
    logo: "B",
    logoType: "text",
    url: "https://bilibili.com",
  },
];
render(hashMap);

$(".addButton").on("click", () => {
  let url = window.prompt("请输入你要添加的网址");
  //   if (url.indexOf("https://") === -1) {
  //     url = `https://${url}`;
  //   }
  hashMap.push({
    logo: simpUrl(url)[0].toUpperCase(),
    logoType: "text",
    url: url,
  });

  render(hashMap);
});
window.onbeforeunload = function () {
  let string = JSON.stringify(hashMap);
  localStorage.setItem("url", string);
  //把网址写入缓存
};
function render(arr) {
  $setItem.find("li:not(.last)").remove();
  //清空页面中的除了新增按钮外的元素
  arr.forEach((node, index) => {
    let url = node.url;
    let logo = node.logo;

    const $li = $(
      `<li class="item">
            
                <div class="logo">${logo}</div>
                <div class="url">${simpUrl(url)}</div>
                <svg class="icon close">
                            <use xlink:href="#icon-close"></use>
                </svg>
            
        </li>`
    ).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(url);
      //打开页面
      
    });
    $li.on("click", ".close", (event) => {
      event.stopPropagation();
      hashMap.splice(index, 1);
      render(hashMap);
      
    });
    ;
  });
}

function simpUrl(str) {
  let shortUrl = str
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .split("/");
  // 替换链接中的http、https、www、/
  // 或者.replace(/\/.*/,'')
  return shortUrl[0];
}
$(document).on("keypress", (e) => {
  const { key } = e;
  hashMap.forEach((n) => {
    if (n.logo.toLowerCase() === key) {
      window.open(n.url);
    }
    console.log(n.logo);
  });
});
