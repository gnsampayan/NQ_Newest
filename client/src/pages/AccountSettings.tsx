import React, { useState } from "react";
import styled from "styled-components";
import Footer from "../components/Widgets/FooterWidget";
import Button from "../components/Buttons/Button";

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const SettingsContainer = styled.div`
    max-width: 600px;
    width: 100%;
    background-color: #2B2B2B;
    padding: 40px;
    border-radius: 20px;
    color: white;
    font-family: "Work Sans";
    margin-bottom: 100px;
`;

const SettingsHeader = styled.h1`
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
`;

const SectionHeader = styled.h2`
    font-size: 18px;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 10px;
`;

const InputField = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    background-color: #3B3B3B;
    border: 1px solid #3B3B3B;
    border-radius: 10px;
    color: white;
    font-size: 16px;

    &:focus {
        outline: none;
        border-color: #8B42E6;
    }
`;

const CheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    margin: 10px 0;
    font-size: 16px;
`;

const CheckboxInput = styled.input`
    margin-right: 10px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-top: 20px;
`;

const AccountSettingsPage: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [emailNotifications, setEmailNotifications] = useState<boolean>(true);
    const [smsNotifications, setSmsNotifications] = useState<boolean>(false);
    const [privacySettings, setPrivacySettings] = useState<boolean>(true);

    const handleSaveSettings = () => {
        console.log("Saving settings...");
        // Handle saving logic here
    };

    return (
        <Wrapper>
            <SettingsContainer>
                <SettingsHeader>Account Settings</SettingsHeader>

                <SectionHeader>Change Password</SectionHeader>
                <InputField
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <InputField
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <InputField
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <SectionHeader>Notification Preferences</SectionHeader>
                <CheckboxLabel>
                    <CheckboxInput
                        type="checkbox"
                        checked={emailNotifications}
                        onChange={(e) => setEmailNotifications(e.target.checked)}
                    />
                    Email Notifications
                </CheckboxLabel>
                <CheckboxLabel>
                    <CheckboxInput
                        type="checkbox"
                        checked={smsNotifications}
                        onChange={(e) => setSmsNotifications(e.target.checked)}
                    />
                    SMS Notifications
                </CheckboxLabel>

                <SectionHeader>Privacy Settings</SectionHeader>
                <CheckboxLabel>
                    <CheckboxInput
                        type="checkbox"
                        checked={privacySettings}
                        onChange={(e) => setPrivacySettings(e.target.checked)}
                    />
                    Make My Profile Public
                </CheckboxLabel>

                <ButtonContainer>
                    <Button title="Save Settings" onClick={handleSaveSettings} />
                </ButtonContainer>
            </SettingsContainer>
            <Footer />
        </Wrapper>
    );
};

export default AccountSettingsPage;
