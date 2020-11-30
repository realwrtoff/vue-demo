import ajax from './ajax'

async function get(url, params) {
  try {
    let response = await ajax({
      method: 'get',
      url,
      params
    });
    const code = response.code;
    let data = response.data;
    let message = response.message;
    if (code === 200) {
      return data;
    } else {
      throw new Error(message);
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function post(url, params) {
  try {
    let response = await ajax({
      method: 'post',
      url,
      data: params
    });
    const code = response.code;
    let data = response.data;
    let message = response.message;
    if (code === 200) {
      return data;
    } else {
      throw new Error(message);
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

const api = {
  login: (params) => post('user/login', params),
  getCompanyList: (params) => get('company/tyc_company', params),
  getCompanyDetail: (company_id, params) => get(`company/tyc_company/${company_id}`, params),
};

export default api
