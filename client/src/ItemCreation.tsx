import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components
const Wrapper = styled.div`
    padding: 20px;
    max-width: 500px;
    margin: auto;
    color: black;
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

const Tag = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
`
const AddTagBtn = styled(Button)`
    width: 100px;
    margin-left: calc(100% - 100px);
`
const DeleteTagBtn = styled.button`
    width: 60px;
`

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
    const [tag, setTag] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const [quantity, setQuantity] = useState<number>(0);
    
    const downsampleImage = (file: File, callback: (blob: Blob) => void) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const maxSideLength = 800; // Maximum side length
                let scale = Math.min(maxSideLength / img.width, maxSideLength / img.height);
                scale = scale > 1 ? 1 : scale; // Ensure scale is not greater than 1
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
    
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    canvas.toBlob((blob) => {
                        if (blob) {
                            callback(blob);
                        }
                    }, 'image/jpeg', 0.85); // Adjust quality as needed
                }
            };
            if (e.target?.result) {
                img.src = e.target.result.toString();
            }
        };
        reader.readAsDataURL(file);
    };

    const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const img = files[0];
            downsampleImage(img, (downsampledImage) => {
                const newFile = new File([downsampledImage], 'downsampled.jpg', {
                    type: 'image/jpeg',
                });
                setSelectedImage(newFile);
                setPreview(URL.createObjectURL(newFile));
            });
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

    const handleTagChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setTag(e.target.value);
    }
    const handleTagAdd = () => {
        //put tag into tagArray
        if (tag && !tags.includes(tag)) {
            setTags([...tags, tag]);
            setTag(''); //Reset the tag input field
        }
    }
    const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();  // Prevents the default form submit behavior
            handleTagAdd();
        }
    };
    const handleTagDelete = (tagToDelete: string) => {
        setTags(tags.filter(tag => tag !== tagToDelete));
    }
    
    const handleQuantityChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const newQuantity = parseInt(e.target.value);
        setQuantity(newQuantity)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Implement upload logic here
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('tags', JSON.stringify(tags));
        formData.append('quantity', quantity.toString());
        if (selectedImage) {
            formData.append('image', selectedImage);
        }
        
        try {
            const response = await fetch('http://localhost:8081/api/items', {
                method: 'POST',
                body: formData,
        });

        const responseData = await response.json();
            console.log(responseData);
            // Handle response data
          } catch (error) {
            console.error('Error submitting form:', error);
          }

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
                <p>Tags</p>
                <div>
                    {tags.map((tag, index) => (
                        <Tag key={index}>
                            {tag}
                            <DeleteTagBtn onClick={() => handleTagDelete(tag)}>Delete</DeleteTagBtn>
                        </Tag>
                    ))}
                </div>
                <Input
                    type="text"
                    placeholder="search tags"
                    value={tag}
                    onChange={handleTagChange}
                    onKeyDown={handleKeyPress}
                />
                <AddTagBtn type="button" onClick={handleTagAdd}>Add tag</AddTagBtn>
                <p>Item quantity</p>
                <Input
                    type='number'
                    placeholder='0'
                    value={quantity}
                    onChange={handleQuantityChange}
                />
                <Button type="submit">Create Item</Button>
            </Form>
        </Wrapper>
    );
}

export default ItemCreation;
