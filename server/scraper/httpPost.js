export const ARTICLE_CREATE_REQUEST = 'ARTICLE_CREATE_REQUEST'
export const ARTICLE_CREATE_SUCCESS = 'ARTICLE_CREATE_SUCCESS'
export const ARTICLE_CREATE_FAIL = 'ARTICLE_CREATE_FAIL'
export const ARTICLE_CREATE_RESET = 'ARTICLE_CREATE_RESET'

import axios from 'axios'

export const createArticle = (articleCreate) => async(dispatch, getState) => {
    try {
        dispatch({
            type: ARTICLE_CREATE_REQUEST,
        })

        const config = {
            headers: { //It just worked like this for PUT. Axious is in x-www-form-urlencoded
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }

        //in the backend, there is a url (API) that it gets the data from the user
        const { data } = await axios.post(
            `/api/articles/create/`,
            { article: articleCreate }, //post needs to send something
            config
        )

        dispatch({
            type: ARTICLE_CREATE_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ARTICLE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}