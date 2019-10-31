const axios = require('axios')
const API_URL = 'https://TSD01.stokab.se'
const qs = require('querystring')

let token = ''

const createToken = async() => {
  const url = `${API_URL}/connect/token`
  const data = {
    grant_type: 'client_credentials',
    client_ID: 'NSC',
    scope: 'Stokab_api.authority Stokab_api.accesslevel3',
    client_secret: 'G1HvQkRkQDqA6ULQnfP9RqqeHKS0zVAmZZxK1o+s8kM='
  }

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }

  try {
    const response = await axios({
      method: 'POST',
      headers,
      data: qs.stringify(data),
      url,
    });
    token = response.data.access_token
    console.log(`Token is created successfully - ${token}`)
  } catch(error) {
    token = ''
    console.log(error.response.status)
  }
}

const fetchAddresses = async (city, street, number) => {
  const url = `${API_URL}/api/1.3/availability/GetByAddress?city=${city}&street=${street}&number=${number}`
    const headers = {
      Authorization: `Bearer ${token}`
    }

    const response = await axios({
      method: 'GET',
      headers,
      url,
    })
    return response.data
}

module.exports = {
  getToken: async () => {
    // await createToken()
    token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg2QTFCNEExNTYwMTQyQUU5OTRCOTNBRjE1NUFGMjUxNjQ5MzUyMUUiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJocUcwb1ZZQlFxNlpTNU92RlZyeVVXU1RVaDQifQ.eyJuYmYiOjE1NzE3MTMyODUsImV4cCI6MTU3MTczMDA4NSwiaXNzIjoiaHR0cHM6Ly90c2QwMS5zdG9rYWIuc2UiLCJhdWQiOlsiaHR0cHM6Ly90c2QwMS5zdG9rYWIuc2UvcmVzb3VyY2VzIiwiU3Rva2FiX2FwaSJdLCJjbGllbnRfaWQiOiJOU0MiLCJBY2NvdW50VXNlcklkIjoiNTU2NzY3LTY0NzIiLCJzY29wZSI6WyJTdG9rYWJfYXBpLmFjY2Vzc2xldmVsMyIsIlN0b2thYl9hcGkuYXV0aG9yaXR5Il19.SIxWBiRUiz4GeJECSlBMAY1lEuHiPvFtGIgSW6GfDxD5WlUxsbYzqOWb2kqr2E3XpXPiqMQ8aARCSlvZ4fdvCDd6IAH59z-wl7lWIHZoBIIdeFfH7Qup8CSNpD_rz9L5JPlPYkmrNmLcQGAX3kBqUqigjC8gym6o-HWd97tdAie-EHzU8BjITmfPU-DrzDlx57-VjfAvJITAYkvXcG-GDCL0EwMBgAjwtxqhUNVeZIaiRgi5zgYcFHmClprPp0mx_ea92WY-k3--7e0e2ME4IG4VeTrkgKwninjzdbrbp1wexz1hQuB5yrxGo_Jzm2RQOnuxzkoc3mxl-h4PqjbJYeBGbL7kF-vuMimfh603SvGH484IPnY7aAMz-GOxl26j0rR7ynEiC12VViI-ukI-IZiJ6xv4UN4KCrlK5DYXK1BMQGQANsLCK8VPON0iCns6FfV8uA0ApVXSXarYaEU_HQT8esVBIc-PDKxAompZ8404cV9rW5Sr8z7ymNO0NKgo_qin1I_xil093e4chPjDry0JJm-8Ij_HlOj8-nSsbrelM8IUPXbjVNmXoeDZnlMnRQz2My5FhQW5VSjU-31R5A3QrxRvg_3IwwxK1VqHPq_KGiZLiyNiEqPyx0jSzZQI-msMdg5LVxg94VAFe6pYn4wm7eJbspdshdoiHuDfqF0'
  },

  fetchAddresses: async (city, street, number) => {
    try {
      const response = await fetchAddresses(city, street, number)
      return response
    } catch(error) {
      if (error.response.status === 401) {
        await createToken()
        console.log('Token is re-created successfully')
        const response = await fetchAddresses(city, street, number)
        return response
      } else {
        return error.response
      }
    }
  }
}