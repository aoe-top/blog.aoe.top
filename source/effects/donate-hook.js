function myDonateHook(code) {
    // 获取图片容器
    const container = document.getElementById("kr-donate-qr");

    // 根据不同的输入确定不同的状态
    let url = ``;

    switch (code) {
        case "example_alipay":
            url =
                "https://mod.3dmgame.com/static/upload/mod/202302/MOD63eb01f0e2912.png@webp";
            break;
        case "example_wechatpay":
            url =
                "https://mod.3dmgame.com/static/upload/mod/202302/MOD63eb01f0e3e14.png@webp";
            break;
    }

    // 应用
    container.innerHTML = `<img src="${url}" alt="捐赠 QR 码" style="width: 150px; height: 150px;">`;
}

window.krDonateModalShowPlatformQR = myDonateHook;
