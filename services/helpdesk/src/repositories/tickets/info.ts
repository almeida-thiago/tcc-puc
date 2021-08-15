import database from '@utils/database'

/**
 * Select tickets info from database
 * @param {string} [person_id] person id
 * @param {string} [agent_id] agent id
 */
export default async (person_id: string | null = null, agent_id: string | null = null): Promise<any> => {
  try {
    if (person_id) {
      const data: any = await database.query({
        query: `
          SELECT 
            tickets.*,
            types.name AS type_name,
            departaments.name AS departament_name,
            channels.name AS channel_name,
            status.name AS status_name,
            owner.name AS owner_name,
            emails.email AS owner_email,
            phone_numbers.phone_number  AS owner_phone_number,
            agent.name AS agent_name
          FROM tbt_001_tickets AS tickets
          LEFT JOIN tbt_004_tickets_types AS types ON tickets.type_id = types.id
          LEFT JOIN tbt_006_departaments AS departaments ON tickets.departament_id = departaments.id 
          LEFT JOIN tbt_007_channels AS channels ON tickets.channel_id = channels.id 
          LEFT JOIN tbt_003_tickets_status AS status ON tickets.status_id = status.id 
          LEFT JOIN tbp_001_people AS owner ON tickets.owner_id = owner.id 
          LEFT JOIN tbp_001_people AS agent ON tickets.agent_id = agent.id 
          LEFT JOIN tbp_002_people_emails AS emails ON tickets.owner_id = emails.person_id AND emails.is_primary = 1
          LEFT JOIN tbp_003_people_phone_numbers AS phone_numbers ON tickets.owner_id = phone_numbers.person_id AND phone_numbers.is_primary = 1
          WHERE tickets.owner_id = ?
        ;`,
        values: [person_id]
      })
      return data
    } else if (agent_id) {
      const data: any = await database.query({
        query: `
          SELECT 
            tickets.*,
            types.name AS type_name,
            departaments.name AS departament_name,
            channels.name AS channel_name,
            status.name AS status_name
          FROM tbt_001_tickets AS tickets
          LEFT JOIN tbt_004_tickets_types AS types ON tickets.type_id = types.id
          LEFT JOIN tbt_006_departaments AS departaments ON tickets.departament_id = departaments.id 
          LEFT JOIN tbt_007_channels AS channels ON tickets.channel_id = channels.id 
          LEFT JOIN tbt_003_tickets_status AS status ON tickets.status_id = status.id 
          WHERE tickets.agent_id = ?
        ;`,
        values: [agent_id]
      })
      return data
    } else {
      const data: any = await database.query({
        query: `
          SELECT 
            tickets.*,
            types.name AS type_name,
            departaments.name AS departament_name,
            channels.name AS channel_name,
            status.name AS status_name
          FROM tbt_001_tickets AS tickets
          LEFT JOIN tbt_004_tickets_types AS types ON tickets.type_id = types.id
          LEFT JOIN tbt_006_departaments AS departaments ON tickets.departament_id = departaments.id 
          LEFT JOIN tbt_007_channels AS channels ON tickets.channel_id = channels.id 
          LEFT JOIN tbt_003_tickets_status AS status ON tickets.status_id = status.id
        ;`})
      return data
    }
  } catch (error) {
    throw error
  }
}
