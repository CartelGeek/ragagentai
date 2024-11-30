import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "password") VALUES ('96032788-a03b-4b8c-9513-fb3983567520', '1Theresia_Moen23@yahoo.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=3', 'inv44556', 'VERIFIED', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('a3683142-4dfc-42a7-8f52-15c35193bf54', 'NextGen Team', 'https://i.imgur.com/YfJQV5z.png?id=102');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('8c5f008a-bae2-4e29-8d13-04587e236cf0', 'Green Solutions', 'https://i.imgur.com/YfJQV5z.png?id=105');

INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('4db700c0-d0bc-4c94-96e9-40e27562eeac', 'Owner', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'a3683142-4dfc-42a7-8f52-15c35193bf54');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('0266b3db-93a9-4f91-821d-5f1e7c8513ea', 'Manager', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '8c5f008a-bae2-4e29-8d13-04587e236cf0');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('53d84c0e-5442-4803-9c66-334e4cf4f096', 'Manager', '96032788-a03b-4b8c-9513-fb3983567520', '8c5f008a-bae2-4e29-8d13-04587e236cf0');

INSERT INTO "Thread" ("id", "question", "dateCreated", "userId", "organizationId") VALUES ('b6f1213a-e7f6-412e-9fd4-5c36567f56e4', 'How do I reset my password', '2024-03-17T20:54:09.342Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'a3683142-4dfc-42a7-8f52-15c35193bf54');


INSERT INTO "Message" ("id", "userId", "type", "answer", "string", "dateCreated", "threadId") VALUES ('b0ec8743-1cf6-467c-8434-b27b1ca1b0f3', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc','user','The chatbot is currently processing your request.', 'This is a sample message for testing purposes.', '2023-10-29T18:46:44.093Z', 'b6f1213a-e7f6-412e-9fd4-5c36567f56e4');
INSERT INTO "Message" ("id",  "userId", "type", "answer", "string", "dateCreated", "threadId") VALUES ('8848d973-e31e-4d6a-975c-e70c5c01ed7c', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc','ai','Please refer to the attached document for detailed instructions.', 'This is a sample message for testing purposes.', '2024-07-12T12:26:35.222Z', 'b6f1213a-e7f6-412e-9fd4-5c36567f56e4');



  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
