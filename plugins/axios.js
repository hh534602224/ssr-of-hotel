
import {Message} from 'element-ui'
export default  ({$axios})=>{
    $axios.onError(hh=>{
        console.log(hh.response);
      const {statusCode,message}=hh.response.data;
      if (statusCode===400){
        Message.warning(message)
      }
        
    })
}