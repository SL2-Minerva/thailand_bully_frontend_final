import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const login = async (data: any): Promise<any> => {
    const body = JSON.stringify({...data})
  
    try {
      return await axios.post('your api', body)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      return e.response
      // throw e
    }
  }