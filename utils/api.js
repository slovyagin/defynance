import qs from 'query-string'
import appConfig from './appConfig.json'

export default async function req ({ table = 'Main', record }, query) {
  const q = qs.stringify({
    ...query,
    api_key: process.env.AIRTABLE_API_KEY
  })
  try {
    const url = `${appConfig.airtableApiUrl}${process.env.DEFYNANCE_TABLE_ID_TABLE_ID}/${table}${record ? `/${record}` : ''}?${q}`
    const res = await fetch(url)
    return await res.json()
  } catch (error) {
    return { error }
  }
}
