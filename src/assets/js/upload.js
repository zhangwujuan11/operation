import COS from 'cos-js-sdk-v5'
let cos = new COS({
  SecretId: 'AKIDsXwFn6PsMZWDpDxEo8g03sd8ML7el27V',
  SecretKey: 'MUM0PZyKFvQfhU2gITP4UfaHB3QYQAj5'
})
const Bucket = 'hchat-cdn-1253674864'
const Region = 'ap-guangzhou'
/**
 * 上传单个对象
 * key  文件名
 * body  文件
 */
export function putObjects (key, body) {
  return new Promise((resolve, reject) => {
    cos.putObject({
      Bucket: Bucket,
      Region: Region,
      Key: "operation/"+key,
      Body: body
    }, function (err, data) {
      if (data) {
        resolve(data)
      }
      if (err) {
        reject(err)
      }
    })
  })
}

export default {
  putObjects
}
