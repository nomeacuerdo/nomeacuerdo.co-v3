import * as React from 'react';
import { Html, Body, Container, Heading, Text, Hr } from '@react-email/components';

interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
}

export default function ContactEmail({ name, email, message }: ContactEmailProps) {
  return (
    <Html>
      <Body style={{ backgroundColor: '#f9fafb', fontFamily: 'sans-serif' }}>
        <Container style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '8px' }}>
          <Heading style={{ color: '#111827', fontSize: '20px', marginBottom: '16px' }}>
            📬 New Contact Message
          </Heading>
          <Text style={{ margin: '8px 0', color: '#374151' }}>
            <strong>Name:</strong> {name}
          </Text>
          <Text style={{ margin: '8px 0', color: '#374151' }}>
            <strong>Email:</strong> {email}
          </Text>
          <Hr style={{ borderColor: '#e5e7eb', margin: '16px 0' }} />
          <Text style={{ color: '#111827' }}>{message}</Text>
          <Hr style={{ borderColor: '#e5e7eb', margin: '24px 0' }} />
          <Text style={{ fontSize: '12px', color: '#6b7280' }}>
            This message was sent from your website’s contact form.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
