declare global {
    namespace NodeJS {
      interface ProcessEnv {
        MONGODB_URI: string,
        JWT_SECRET:string
      }
    }
}
export {}