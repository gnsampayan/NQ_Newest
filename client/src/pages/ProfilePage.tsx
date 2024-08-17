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

const ProfileContainer = styled.div`
    max-width: 600px;
    width: 100%;
    background-color: #2B2B2B;
    padding: 40px;
    border-radius: 20px;
    color: white;
    font-family: "Work Sans";
    margin-bottom: 100px;
`;

const ProfileHeader = styled.h1`
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
`;

const ProfilePicture = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

const Image = styled.img`
    border-radius: 50%;
    width: 150px;
    height: 150px;
    object-fit: cover;
`;

const UploadButton = styled.label`
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #8B42E6;
    border-radius: 20px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    display: inline-block;
    color: white;
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

const TextArea = styled.textarea`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    background-color: #3B3B3B;
    border: 1px solid #3B3B3B;
    border-radius: 10px;
    color: white;
    font-size: 16px;
    resize: none;

    &:focus {
        outline: none;
        border-color: #8B42E6;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const RemoveButton = styled(Button)`
    background-color: #E74C3C;
    color: white;

    &:hover {
        background-color: #C0392B;
    }
`;

const ProfilePage: React.FC = () => {
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [bio, setBio] = useState<string>("");

    const handlePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        console.log("Saving profile...");
        // Handle saving logic here
    };

    const handleRemove = () => {
        console.log("Removing profile...");
        // Handle removing logic here
    };

    return (
        <Wrapper>
            <ProfileContainer>
                <ProfileHeader>My Profile</ProfileHeader>
                <ProfilePicture>
                    <Image src={profilePicture || "https://via.placeholder.com/150"} alt="Profile" />
                </ProfilePicture>
                <UploadButton>
                    Upload Picture
                    <input
                        type="file"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handlePictureUpload}
                    />
                </UploadButton>
                <InputField
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <InputField
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextArea
                    rows={5}
                    placeholder="Bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
                <ButtonContainer>
                    <Button title="Save Changes" onClick={handleSave} />
                    <RemoveButton title="Remove Profile" onClick={handleRemove} />
                </ButtonContainer>
            </ProfileContainer>
            <Footer />
        </Wrapper>
    );
};

export default ProfilePage;
