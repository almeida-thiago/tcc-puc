import { MysqlError, createPool, Pool, PoolConnection } from 'mysql'

type Query = {
  query: string;
  values?: Object | null;
}

const pool: Pool = createPool({
  connectionLimit: 20,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

/**
 * Execute query
 * @param {Query} queries
 */
const query = (queries: Query, connection: PoolConnection | null = null): Promise<any> => new Promise(
  (resolve: any, reject: any): void => {
    if (connection) {
      connection.query(queries.query, queries.values, (error: MysqlError | null, results: any): void => {
        if (error) {
          reject(error.message)
        }
        resolve(results)
      })
    } else {
      pool.query(queries.query, queries.values, (error: MysqlError | null, results: any): void => {
        if (error) {
          reject(error.message)
        }
        resolve(results)
      })
    }
  })

const truncateAllTables = (): Promise<any> => new Promise(
  (resolve: any, reject: any): void => {
    pool.query('CALL truncate_all_tables();', null, (error: MysqlError | null, results: any): void => {
      if (error) {
        reject(error.message)
      }
      resolve(true)
    })
  })

  const poolConnection = (): Promise<PoolConnection> => new Promise((resolve: any, reject: any): void => {
    pool.getConnection((error: MysqlError, connection: PoolConnection) => {
      if (error) {
        reject(error.message)
      }
      resolve(connection)
    })
  })

const database = { poolConnection, query, truncateAllTables }

export default database
