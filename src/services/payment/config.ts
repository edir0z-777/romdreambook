export const meshulamConfig = {
  apiKey: import.meta.env.VITE_MESHULAM_API_KEY || '',
  pageCode: import.meta.env.VITE_MESHULAM_PAGE_CODE || '',
  sandbox: import.meta.env.DEV,
  baseUrl: 'https://sandbox.meshulam.co.il/api/v1/light'
};