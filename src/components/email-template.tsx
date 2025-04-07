import {
    Body,
    Container,
    Font,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
} from '@react-email/components';
import * as React from 'react';

interface VerifyEmailProps {
    username: string;
    otp: string;
}

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000';

export default function VerifyEmail({ username, otp }: VerifyEmailProps) {
    return (
        <Html>
            <Head>
                <Font
                    fontFamily="Lexend"
                    fallbackFontFamily="Arial"
                    webFont={{
                        url: 'https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap',
                        format: 'woff2',
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                />
            </Head>
            <Body style={main}>
                <Preview>Verify your email for AnonEcho</Preview>
                <Container style={container}>
                    <Section style={coverSection}>
                        <Section style={imageSection}>
                            <Img
                                src={`${baseUrl}/assets/logo.png`}
                                width="100"
                                height="50"
                                alt="AnonEcho Logo"
                            />
                        </Section>
                        <Section style={upperSection}>
                            <Heading style={h1}>Verify Your Email</Heading>
                            <Text style={mainText}>
                                Hi {username}, thanks for using AnonEcho. To complete your signup,
                                please enter the verification code below.
                            </Text>
                            <Section style={verificationSection}>
                                <Text style={verifyText}>Your Verification Code</Text>
                                <Text style={codeText}>{otp}</Text>
                                <Text style={validityText}>(This code expires in 24 hours)</Text>
                            </Section>
                        </Section>
                        <Hr />
                        <Section style={lowerSection}>
                            <Text style={cautionText}>
                                Never share this code with anyone. If you didn’t request this, ignore this email.
                            </Text>
                        </Section>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}

const main = {
    backgroundColor: '#fff',
    color: '#212121',
    fontFamily: "'Lexend', sans-serif"
};

const container = {
    padding: '20px',
    margin: '0 auto',
    backgroundColor: '#f4f4f4',
};

const h1 = {
    color: '#333',
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '15px',
};

const text = {
    color: '#333',
    fontSize: '14px',
    margin: '24px 0',
};

const imageSection = {
    backgroundColor: '#252f3d',
    display: 'flex',
    padding: '20px 0',
    alignItems: 'center',
    justifyContent: 'center',
};

const coverSection = { backgroundColor: '#fff' };
const upperSection = { padding: '25px 35px' };
const lowerSection = { padding: '25px 35px' };

const verifyText = {
    ...text,
    margin: 0,
    fontWeight: 'bold',
    textAlign: 'center' as const,
};

const codeText = {
    ...text,
    fontWeight: 'bold',
    fontSize: '36px',
    margin: '10px 0',
    textAlign: 'center' as const,
};

const validityText = {
    ...text,
    margin: '0px',
    textAlign: 'center' as const,
};

const verificationSection = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
};

const mainText = { ...text, marginBottom: '14px' };
const cautionText = { ...text, margin: '0px' };
