import ContactEmail from '@/emails/ContactEmail';
import React from 'react';

export function renderContactEmail(name: string, email: string, message: string) {
  return <ContactEmail name={name} email={email} message={message} />;
}
