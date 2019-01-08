


export let BASE_URL = "http://popups.endorse.gg";
export let BASE_API_URL = "http://popups.endorse.gg/api";


export function setConfig() {
  if (process.env.NODE_ENV !== 'production') {
    BASE_URL = "http://localhost:5000";
    BASE_API_URL = "http://localhost:5000/api";
  }
}