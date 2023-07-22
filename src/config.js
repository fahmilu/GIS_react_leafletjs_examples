const CONFIG = {
    TOKEN_ENDPOINT: "http://192.168.56.5:8000/o/token/",
    AUTHORIZE_ENDPOINT: "http://192.168.56.5:8000/o/authorize/",
    RESPONSE_TYPE: "code",
    SCOPE: "openid",
    REDIRECT_URI: "http://192.168.56.5:3000/login-geonode",
    CLIENT_ID: "HpK94cv5bSqdgItYXftaOcLIhW00oDWqe0hVty3u",
    CLIENT_SECRET: "yCmhMewgaJA3sC8Hh1MTUjr7jzjpTAzkUnyGBCFlSfAmrpfeD8E6kZiShVpp40xMclqsJ6GbbMzMxUrTVuvqQiTir3DD85sZxAdkzP4Sx1W2hXxjpMWKLH5OUG01zMZZ",
    GRANT_TYPE: "authorization_code",
    CLIENT_URL: "http://192.168.56.5:3000",
    LOGOUT_URL: "http://192.168.56.5:3000/logout",
    COOKIE_PATH: "/",
    EXAMPLE_HOME: 'http://192.168.56.5:8000/catalyze/jwt/',
    EXAMPLE_IFRAME: "http://192.168.56.5:8000/maps/5/embed",
    JWT_TOKEN_LOGIN:  "http://192.168.56.5:8000/catalyze/token/",
    JWT_LOGOUT: 'http://192.168.56.5:8000/catalyze/logout/',

  };

export default CONFIG;