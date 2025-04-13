import { pgTable, serial, uuid, text, json, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull(),
  password : varchar('password').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const chats = pgTable('chats', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  prompt: text('prompt').notNull(),
  json_data: json('json_data').default('{}'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  chatId: serial('chat_id').references(() => chats.id),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(), 
})