import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components
const Wrapper = styled.div`
    padding: 20px;
    max-width: 500px;
    margin: auto;
    color: white;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Input = styled.input`
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const Button = styled.button`
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;

const ImagePreview = styled.img`
    max-width: 300px;
    max-height: 300px;
    margin-top: 10px;
`;


const ItemCreation = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState('');

    const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const img = files[0];
            setSelectedImage(img);
            setPreview(URL.createObjectURL(img));
        }
    };

    const formatPrice = (value : any) => {
        // Remove non-numeric characters except the decimal point
        const cleaned = ('' + value).replace(/[^\d.]/g, '');
        // Format the number to two decimal places
        return cleaned.match(/^\d+(\.\d{0,2})?/g)?.[0] || '';
    };

    const handlePriceChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const newPrice = formatPrice(e.target.value);
        setPrice(newPrice);
    };

    const displayPrice = price ? `$${price}` : '';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Implement upload logic here
        const formData = new FormData();
        if (selectedImage) {
            formData.append('image', selectedImage);
        }
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);

        console.log(formData);
        // Further processing or server submission goes here
    };

    return (
        <Wrapper>
            <Form onSubmit={handleSubmit}>
                <h5>Upload Item Image</h5>
                <Input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange}
                    />
                {preview && <ImagePreview src={preview} alt="Preview" />}
                <h5>Item Details</h5>
                <p>Item title</p>
                <Input 
                    type="text"
                    placeholder="Type item title here"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <p>Item description</p>
                <Input 
                    type="text"
                    placeholder="Type description here"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <p>Item price</p>
                <Input 
                    type="text"
                    placeholder="$0.00"
                    value={displayPrice}
                    onChange={handlePriceChange}
                />
                <Button type="submit">Create Item</Button>
            </Form>
        </Wrapper>
    );
}

export default ItemCreation;
