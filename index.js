const getData = require("./api-data");
const axios = require("axios");
async function sendDiscord() {
  try {
    let number = Math.floor(Math.random() * 7302) + 1;
    let data = await getData(number);
    let { itemId, title } = data;
    console.log("id=" + number);
    console.log(title, itemId);
    if (title === "") return;
    const url = ""; //ここにwebhookのURLを入れてください
    const body = {
      username: "", //名前を入れてください
      avatar_url: "", //アイコンのURLを指定
      embeds: [
        {
          title: "**今回取得したアニメ**",
          description: "ランダムに取得されたアニメの情報です！",
          url: "https://cal.syoboi.jp/tid/" + itemId,
          color: 0x3498db,
          footer: {
            text: "使用API: https://cal.syoboi.jp",
          },
          fields: [
            {
              name: "**タイトル**",
              value: title,
              inline: true,
            },
            {
              name: "**ID**",
              value: itemId,
              inline: true,
            },
            {
              name: "ツール制作者",
              value: "[Github @kozaku05](https://github.com/kozaku05/AniCord)",
              inline: false,
            },
          ],
        },
      ],
    };
    axios.post(url, body);
  } catch (error) {
    console.error("Error in sendDiscord:", error.message);
  }
}
sendDiscord();
setInterval(sendDiscord, 600000);//好きなミリ秒を入力
