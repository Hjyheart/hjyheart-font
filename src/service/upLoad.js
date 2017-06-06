/**
 * Created by hongjiayong on 2017/5/30.
 */

import {baseUrl} from '../../config/index'

export default async (type = 'POST', url = '', data) =>{

  return new Promise((resolve, reject) => {
    url = baseUrl + url
    var requestObj = new XMLHttpRequest()

    requestObj.upload.addEventListener("progress", updateProgress, false);

    requestObj.open(type, url, true)
    requestObj.send(data)

    requestObj.onreadystatechange = () => {
      if (requestObj.readyState === 4) {
        if (requestObj.status === 200) {
          let obj = requestObj.response;
          if (typeof obj !== 'object') {
            try{
              obj = JSON.parse(obj);
            }catch (e){
              console.log(e)
              obj = -1
            }
          }
          resolve(obj)
        } else {
          reject(requestObj)
        }
      }
    }
  })

  function updateProgress(e) {
    if (e.lengthComputable){
      var complete = (event.loaded / event.total * 100 | 0);
      console.log(complete)
    }
  }
}
