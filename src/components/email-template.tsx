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
    Tailwind,
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
                    fontFamily="Poppins"
                    fallbackFontFamily="Arial"
                    webFont={{
                        url: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
                        format: 'woff2',
                    }}
                />
            </Head>
            <Preview>Verify your email for AnonEcho</Preview>
            <Tailwind>
                <Body className="bg-white text-[#212121]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <Container className="bg-[#f4f4f4] p-5 mx-auto" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        <Section className="bg-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                            {/* Logo Section */}
                            <Section className="bg-[#252f3d] flex items-center justify-center py-5" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                <Img
                                    src={`${baseUrl}/assets/logo.png`}
                                    width="100"
                                    height="50"
                                    alt="AnonEcho Logo"
                                />
                            </Section>

                            {/* Content Section */}
                            <Section className="px-10 py-7" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                <Heading className="text-[22px] font-bold text-[#333] mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                    Verify Your Email
                                </Heading>
                                <Text className="text-[14px] text-[#333] mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                    Hi {username}, thanks for using AnonEcho. To complete your signup,
                                    please enter the verification code below.
                                </Text>

                                {/* Verification Code Section */}
                                <Section className="flex flex-col items-center justify-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                    <Text className="text-[14px] text-[#333] font-bold text-center m-0" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                        Your Verification Code
                                    </Text>
                                    <Text className="text-[36px] font-bold text-center my-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                        {otp}
                                    </Text>
                                    <Text className="text-[14px] text-[#333] text-center m-0" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                        (This code expires in 24 hours)
                                    </Text>
                                </Section>
                            </Section>

                            <Hr />

                            {/* Warning Section */}
                            <Section className="px-10 py-7" style={{ fontFamily: "'Lexend', Arial, sans-serif" }}>
                                <Text className="text-[14px] text-[#333] m-0" style={{ fontFamily: "'Lexend', Arial, sans-serif" }}>
                                    Never share this code with anyone. If you didn’t request this, ignore this email.
                                </Text>
                            </Section>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
