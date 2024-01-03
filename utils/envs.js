const env = import.meta.env
const { MODE } = env

export function getEnvs() {
  let envStr = ''
  const envMap = {
    development: 'dev',
    production: 'pro',
  }
  envStr = envMap[MODE]

  return {
    envStr,
  }
}
