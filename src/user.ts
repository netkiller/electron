
/**
     * 登录函数，旧版登录函数，无法返回信息
     * @param user 用户名
     * @param pwd 密码
     */
function login(username:string, password:string) {
    console.log(username, password);
    // const formData = {
    //     "username": username,
    //     "password": password,
    //     // "client_id": "L******P",  
    //     // "client_secret": "secret",
    //     // "scope": "all", 
    //     // "grant_type": "password"
    // };
    // request.post({ url: 'https://***.test.ti*****k.cn/oauth/token', formData: formData }, (err, httpResponse, body) => {
    //     if (err) {
    //         window.showInformationMessage('登录失败！');
    //         return console.error('upload failed:', err);
    //     }
    //     let data = JSON.parse(body);
    //     let token: string = data.access_token;
    //     let uid: string = data.uid;
    //     console.log(data);
    //     if (data.code == '400') {
    //         window.showInformationMessage("登录失败！账号或密码错误");
    //     }
    //     else {
    //         window.showInformationMessage("登录成功！");
    //         L ****** b.getExperimentByToken(token);
    //         Gitee.getGiteeByToken(token, uid);
    //         commands.executeCommand('webide.test');
    //         commands.executeCommand('webide.burnRefresh');
    //     }
    // });
}


// class Greeter {
//     greeting: string;
//     constructor(message: string) {
//         this.greeting = message;
//     }
//     greet() {
//         return "Hello, " + this.greeting;
//     }
// }

// let greeter = new Greeter("world");