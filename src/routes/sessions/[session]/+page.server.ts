// +page.server.ts

import type { PageServerLoad } from './$types';
import { error, type Actions, fail } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const load: PageServerLoad = async ({ params, cookies }) => {
  const sessionName = params.session;
  const username = cookies.get('username');

  // Check if the session exists in the database
  const session = await prisma.session.findUnique({
    where: { name: sessionName },
    include: { messages: { include: { sender: true } } }, // Include messages and sender details
  });

  if (!session) {
    throw error(404, 'Session not found');
  }

  return {
    session: session.name,
    messages: session.messages.map((message : any) => ({
      text: message.text,
      user: message.sender?.name,
    })),
    username: username,
  };
};

export const actions: Actions = {
  message: async ({ request, cookies, params }) => {
    const sessionName = params.session;
    const formData = await request.formData();
    const msg = formData.get('message')?.toString();
    const username = cookies.get('username');

    if (!msg) {
      // Handle empty message appropriately
      return fail(300, {msg: "Don't send empty messages ffs."})
    }

    // Find the session in the database
    const session = await prisma.session.findUnique({
      where: { name: sessionName },
    });

    if (!session) {
      throw error(404, 'Session not found.');
    }

    if(!username){
      return fail(300, {msg: "User not found."})
    }
    
    const prismaUser = await prisma.user.findUnique({where: {name: username}});
    const id = prismaUser?.id ? prismaUser.id : -1;

    
    // Create a new message in the database
    await prisma.message.create({
      data: {
        text: msg!,
        userId: id, // Replace with the actual user ID (you may need to fetch it based on the username)
        sessionId: session.id,
      },
    });
  },
};