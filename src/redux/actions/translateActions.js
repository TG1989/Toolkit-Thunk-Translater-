
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from '../../constant'

//Thunk action

export const getLanguages = createAsyncThunk
  ("language/getLanguages",
    async () => {

      //get language datas from API
      const res = await axios.request(options)

     
      //return action's payload data
      return res.data.data.languages
    }
  )

//This action translates and transfers the result to the store

export const translateText = createAsyncThunk(
  'translate/text',
  async ({ text, sourceLang, targetLang }) => {

    const params = new URLSearchParams();
    params.set('source_language', sourceLang.value);
    params.set('target_language', targetLang.value);
    params.set('text', text);

    const options = {
      method: 'POST',
      url: 'https://text-translator2.p.rapidapi.com/translate',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '6d167ce9a2msh9b0a5569b4bac65p1ad477jsnd02e5b2abf1e',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
      },
      data: params,
    };
    //API request
    const res = await axios.request(options)
    //Actions payload
    return res.data.data.translatedText
  }
)

