export function oss(data, file, filename) {
    const key = data.dir + "wechat/avatar/" + filename
    const url = data.host

    return new Promise((resolve, reject) => {
        uni.uploadFile({
            url: data.host,  //后台给的阿里云存储给的上传地址
            filePath: file,
            fileType: "image",
            name: 'file',
            formData: {
                name: "",
                key: key,  //文件名
                policy: data.policy,  //后台获取超时时间
                OSSAccessKeyId: data.accessid, //后台获取临时ID
                success_action_status: '200', //让服务端返回200,不然，默认会返回204
                signature: data.signature //后台获取签名
            },
            success: (res) => {
                resolve({success: true, data: url + key})
            },
            fail: (err) => {
                reject({success: false, data: '上传失败'})
            }
        })
    })
}
