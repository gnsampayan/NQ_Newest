import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ItemType } from './context/Types';

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

const Dropdown = styled.div`
    position: absolute;
    background-color: #f6f6f6;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 99;
`;

const DropdownItem = styled.div`
    padding: 8px;
    cursor: pointer;
    &:hover {
        background-color: #ddd;
    }
`;

interface ItemCreationProps {
    isEditing: boolean;
    itemData?: ItemType;
    onSuccessfulUpdate?: () => void;
}

interface TagResponse {
    tag: string;
}

const ItemCreation = ({ isEditing, itemData, onSuccessfulUpdate } : ItemCreationProps ) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState('');
    const [tag, setTag] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const [quantity, setQuantity] = useState<number>(0);
    const [inputKey, setInputKey] = useState(Date.now());

    const [databaseTags, setDatabaseTags] = useState<string[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);


    useEffect(() => {
        if (isEditing && itemData) {
            setTitle(itemData.title || '');
            setDescription(itemData.description || '');
            setPrice(itemData.price.toString() || '');
            setTags(itemData.tags || []);
            setQuantity(itemData.quantity || 0);
            
            if (itemData.image) {
                // Assuming itemData.image is a Base64 string from the backend
                setPreview(`data:image/jpeg;base64,${itemData.image}`);
                } else {
                    setPreview('');
                }
            }
            
            const fetchTags = async () => {
                try {
                    const response = await fetch('http://localhost:8081/api/all_tags');
                    if (!response.ok) {
                        throw new Error(`Error: Failed to fetch tags. Status: ${response.status}`);
                    }
            
                    const responseText = await response.text();
                    console.log('Response Text:', responseText); // Log the raw response text
            
                    // Only parse JSON if the response text is not empty
                    if (responseText) {
                        const data: TagResponse[] = JSON.parse(responseText);
                        const tags = data.map(item => item.tag);
                        setDatabaseTags(tags);
                    } else {
                        console.error('Empty response from the server');
                    }
                } catch (error) {
                    console.error('Failed to fetch tags:', error);
                }
            };
            
            fetchTags();
    }, [isEditing, itemData]);
    
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

    const handleTagAdd = () => {
        if (tag && !tags.includes(tag)) {
            setTags([...tags, tag]);
            setTag(''); // Reset the tag input field
            setShowDropdown(false); // Hide the dropdown
        }
    };
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
            // Check if item exists if creating a new item
            if (!isEditing) {
                const checkExistsResponse = await fetch(`http://localhost:8081/api/items/check-exists?title=${encodeURIComponent(title)}`);
                if (!checkExistsResponse.ok) {
                    throw new Error(`Error: Failed to check if item exists. Status: ${checkExistsResponse.status}`);
                }            
                const checkExistsData = await checkExistsResponse.json();
                if (checkExistsData.exists) {
                    console.error('Error: Item already exists');
                    return;
                }
                console.log(checkExistsData);
            }
    
            // Create or update item
            let response;
            if (isEditing && itemData) {
                formData.append('id', itemData.id.toString());
                response = await fetch(`http://localhost:8081/api/items/${itemData.id}`, {
                    method: 'PUT',
                    body: formData,
                });
                console.log('Perform update operation');
            } else {
                response = await fetch('http://localhost:8081/api/items', {
                    method: 'POST',
                    body: formData,
                });
                console.log('Perform create operation');
            }
    
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
    
                // Call onSuccessfulUpdate after successful response
                if (typeof onSuccessfulUpdate === 'function') {
                    onSuccessfulUpdate();
                }
                // Clearing input fields after creating item
                if (!isEditing) {
                    setTitle('');
                    setDescription('');
                    setPrice('');
                    setTags([]);
                    setQuantity(0);
                    setSelectedImage(null);
                    setPreview('');
                    setTag('');
                    setInputKey(Date.now());  // This will change the key and reset the input
                    console.log("Form reset executed");
                }

            } else {
                console.error(`Error: ${response.status}`, await response.json());
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    
    // Filter tags based on input
    const filteredTags = databaseTags ? databaseTags.filter(
        dbTag => dbTag.toLowerCase().includes(tag.toLowerCase()) && !tags.includes(dbTag)
    ) : [];

    const handleTagInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setTag(e.target.value);
        setShowDropdown(e.target.value !== '');
    };

    const handleTagSelection = (selectedTag: string) => {
        if (!tags.includes(selectedTag)) {
            setTags(prevTags => [...prevTags, selectedTag]);
        }
        setTag('');
        setShowDropdown(false); // Hide the dropdown
    };



    return (
        <Wrapper>
            <Form onSubmit={handleSubmit}>
                <h5>Upload Item Image</h5>
                <Input 
                    key={inputKey}
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
                <div style={{ position: 'relative' }}>
                    <Input
                        type="text"
                        placeholder="search tags"
                        value={tag}
                        onChange={handleTagInputChange}
                        onKeyDown={handleKeyPress}
                    />
                    {showDropdown && (
                        <Dropdown>
                            {filteredTags.map((filteredTag, index) => (
                                <DropdownItem key={index} onClick={() => handleTagSelection(filteredTag)}>
                                    {filteredTag}
                                </DropdownItem>
                            ))}
                        </Dropdown>
                    )}
                </div>
                <AddTagBtn type="button" onClick={handleTagAdd}>Add tag</AddTagBtn>
                <div>
                    {tags.map((tag, index) => (
                        <Tag key={index}>
                            {tag}
                            <DeleteTagBtn type='button' onClick={() => handleTagDelete(tag)}>Delete</DeleteTagBtn>
                        </Tag>
                    ))}
                </div>
                <p>Item quantity</p>
                <Input
                    type='number'
                    placeholder='0'
                    value={quantity}
                    onChange={handleQuantityChange}
                />
                <Button type="submit">{isEditing ? 'Submit Changes' : 'Create Item'}</Button>
            </Form>
        </Wrapper>
    );
    
}

export default ItemCreation;
