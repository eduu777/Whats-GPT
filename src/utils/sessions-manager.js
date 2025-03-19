const sessions = new Map();

export async function createSession(userId) {
  sessions.set(userId, Date.now());

  setTimeout(() => {
    sessions.delete(userId);
    console.log(`Sessao de ${userId} expirada`);
  }, 2 * 60 * 60 * 1000);
}

export async function sessionsActive(userId) {
  return sessions.has(userId);
}
