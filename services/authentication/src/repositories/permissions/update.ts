import database from '@utils/database'
import { Permission } from '@models/permission'
import selectPermissions from '@repositories/permissions/select'

/**
 * Update user from database
 * @param {string} id permission id
 * @param {Permission} id permission data
 */
export default async (id: string, data: Permission): Promise<Permission> => {
  try {
    await database.query({
      query: `
        UPDATE tbu_002_users_permissions
        SET 
          last_updated_at = ?,
          name = ?
        WHERE id = ? 
      ;`,
      values: [
        new Date(),
        data.name,
        id
      ]
    })
    const permissionData: Permission | Permission[] = await selectPermissions(data.id)
    if(Array.isArray(permissionData)){
      throw new Error('Cannot retrieve user permission data')
    }
    return permissionData
  } catch (error) {
    throw error
  }
}
