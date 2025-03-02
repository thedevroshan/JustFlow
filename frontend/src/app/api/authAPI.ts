import axios from "axios";
import { AxiosResponse } from "axios";
import { headers } from "next/headers";




export const SignUpAPI = async (name: String, email: String, password: String): Promise<AxiosResponse | void> => {
  try {
    const response:AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,{
        name,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    return response;
  } catch (error) {
    if(process.env.NODE_ENV as string === "development") {
      console.log(error);
      return;
    }
    console.warn("Something went wrong while signing up");
  }
};


export const LoginAPI = async (email: String, password: String): Promise<AxiosResponse | void> => {
  try {
    const response:AxiosResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login?email=${email}&password=${password}`,{withCredentials: true, headers: {
      "Content-Type": 'application/json',
    }});
    
    return response;
  } catch (error) {
    if(process.env.NODE_ENV as string === "development") {
      console.log(error);
      return;
    }
    console.warn("Something went wrong while signing up");
  }
};
