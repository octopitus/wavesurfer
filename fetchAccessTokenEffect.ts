import {useState, useEffect} from 'react'

// prettier-ignore
const base64EncodedToken = 'NTkxMWNkN2JiNGFlNDBjYWIyZGZjYTI4NTgxZjQwOGY6YzhiZDQyNjg3MzkzNDk0NDkyMWNjNTZmM2YwMWE2YTI='

export default function useAccessToken() {
  const [accessToken, setAccessToken] = useState('')

  useEffect(() => {
    async function fetchAccessToken() {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        body: 'grant_type=client_credentials',
        headers: {
          Authorization: `Basic ${base64EncodedToken}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST'
      })

      const {access_token: accessToken} = await response.json()

      return accessToken
    }

    fetchAccessToken().then(accessToken => {
      setAccessToken(accessToken)
    })
  }, [])

  return accessToken
}
