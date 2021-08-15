import database from '@utils/database'
import { Permission } from '@models/permission'
import selectPermissions from '@repositories/permissions/select'

/**
 * Insert user permission in database
 * @param {Permission} data permission data
 */
export default async (data: Permission): Promise<Permission> => {
  try {
    const databaseValue = await database.query({
      query: `
        INSERT INTO tbu_002_users_permissions 
          (name) 
        VALUES 
          (?)
      ;`,
      values: [data.name]
    })
    const permissionData: Permission | Permission[] = await selectPermissions(databaseValue.insertId)
    if(Array.isArray(permissionData)){
      throw new Error('Cannot retrieve user permission data')
    }
    return permissionData
  } catch (error) {
    throw error
  }
}
