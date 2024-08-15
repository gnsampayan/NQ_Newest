import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ItemType } from '../context/Types';
import apiConfig from '../api-config';
import Button from '../components/Buttons/Button';
import { MdOutlineNewLabel } from "react-icons/md";
import { LuDelete } from "react-icons/lu";
import { RiSave3Fill } from "react-icons/ri";
import { IoMdAdd } from 'react-icons/io';

// Styled components
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 40px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    padding-right: 20px;
`;

const Input = styled.input`
    all: unset;
    padding: 8px;
    border-radius: 4px;
    color: white;
    background: #3B3B3B;
    cursor: pointer;
`;
const SubmitContainer = styled.div`
    width: 100%;
    padding: 20px;
`
const Submit = styled.button`
    all: unset;
    cursor: pointer;
`;
const ImagePreview = styled.img`
    max-width: 300px;
    max-height: 300px;
    margin-top: 10px;
`;
const Dropdown = styled.div`
    position: absolute;
    color: white;
    background: #3B3B3B;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid #ddd;
    border-radius: 4px;
    z-index: 99;
`;
const DropdownItem = styled.div`
    padding: 8px;
    cursor: pointer;
    &:hover {
        background-color: #ddd;
    }
`;
const Heading = styled.h5`
    color: white;
    margin-top: 20px;
    /* H5 - Work Sans */
    font-family: "Work Sans";
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 30.8px */
    text-transform: capitalize;
    `
const Label = styled.p`
  color: white;
  /* Caption - Space Mono */
  font-family: "Space Mono";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 110%; /* 13.2px */
  margin-bottom: 8px;
  `
const Description = styled.p`
  display: flex;
  flex-direction: column;
  gap: 0px;
  position: relative;
  margin-top: 0px;
  margin-bottom: 10px;
  `
const TextArea = styled.textarea`
    display: flex;
    height: 100px;
    width: 100%;
    align-items: center;
    gap: 12px;
    align-self: stretch;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #858584;
    color: white;
    background: #3B3B3B;
    resize: vertical;
    `
const TagSearchAndSubmit = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    `
const TagSearch = styled.div`
    position: relative;
    `
const TagInput = styled.input`
    padding: 8px;
    border-radius: 4px;
    width: auto;
    color: white;
    background: #3B3B3B;
    &::placeholder {
        color: white;
        font-style: italic;
    }
`
const TagItems = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 10px;
`
const Tag = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
    background: #3B3B3B;
    border-radius: 20px;
    padding: 4px 12px;
`
const DeleteTagBtn = styled.button`
    all: unset;
    color: #A259FF;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 2px;
    &:hover {
        color: red;
    }
`
const TagName = styled.p`
    all: unset;
    color: white;
    /* Base(Body) - Work Sans */
    font-family: "Work Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 22.4px */
`
const PricingAndSales = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    gap: 10px;
`

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
    const [saleBool, setSaleBool] = useState<number>(0);
    const [saleRate, setSaleRate] = useState<number>(1);
    const [saleEnd, setSaleEnd] = useState<string>('');

    const [databaseTags, setDatabaseTags] = useState<string[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const tagInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && itemData) {
            setTitle(itemData.title || '');
            setDescription(itemData.description || '');
            setPrice(itemData.price.toString() || '');
            setTags(itemData.tags || []);
            setQuantity(itemData.quantity || 0);
            setSaleBool(itemData.saleBool || 0);
            setSaleRate(itemData.saleRate || 1);
            setSaleEnd(itemData.saleEnd || '');
            
            if (itemData.image) {
                // Assuming itemData.image is a Base64 string from the backend
                setPreview(`data:image/jpeg;base64,${itemData.image}`);
                } else {
                    setPreview('');
                }
            }
            fetchTags();
    }, [isEditing, itemData]);

    const fetchTags = async () => {
        try {
            const response = await fetch(`${apiConfig.API_URL}/all_tags`);
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
        // Append sale fields
        formData.append('saleBool', saleBool.toString());
        formData.append('saleRate', saleRate.toString());
        formData.append('saleEnd', saleEnd);
        if (selectedImage) {
            formData.append('image', selectedImage);
        }
    
        try {
            // Check if item exists if creating a new item
            if (!isEditing) {
                const checkExistsResponse = await fetch(`${apiConfig.API_URL}/items/check-exists?title=${encodeURIComponent(title)}`);
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
                response = await fetch(`${apiConfig.API_URL}/items/${itemData.id}`, {
                    method: 'PUT',
                    body: formData,
                });
                console.log('Perform update operation');
            } else {
                response = await fetch(`${apiConfig.API_URL}/items`, {
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
                    setSaleBool(0);
                    setSaleRate(1);
                    setSaleEnd('');
                    setInputKey(Date.now());  // This will change the key and reset the input
                }
                // Refetch the tags after successful submission
                fetchTags();
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
        const value = e.target.value;
        // Capitalize the first letter and add the rest of the string
        const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
        setTag(capitalizedValue);
        setShowDropdown(true);
    };
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

    const handleTagInputFocus: React.FocusEventHandler<HTMLInputElement> = () => {
        setShowDropdown(true);
    };

    const handleTagInputBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
        // Check if the new focus target is inside the dropdown
        if (e.relatedTarget && (e.relatedTarget as HTMLElement).closest('.dropdown-item')) {
            return;
        }
        // Use a timeout to allow time for handleTagSelection to be called on click
        setTimeout(() => {
            setShowDropdown(false);
        }, 100);
    };

    const handleTagSelection = (selectedTag: string) => {
        if (!tags.includes(selectedTag)) {
            setTags(prevTags => [...prevTags, selectedTag]);
        }
        setTag('');
        setShowDropdown(false); // Hide the dropdown
        tagInputRef.current?.blur(); // Manually blur the input field
    };

    const handleDropdownMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault(); // Prevents the input from losing focus
    };

    return (
        <Wrapper>
            <Form onSubmit={handleSubmit}>
                <Description>
                    <Label>Upload Item Image</Label>
                    <Input 
                        key={inputKey}
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange}
                    />
                    {preview && <ImagePreview src={preview} alt="Preview" />}
                </Description>
                <Heading>Item Details</Heading>
                <Description>
                    <Label>Item title</Label>
                    <Input 
                        type="text"
                        placeholder="Type item title here"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Description>
                <Description>
                    <Label>Item description</Label>
                    <TextArea 
                        name="description"
                        placeholder="Type description here"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Description>
                <PricingAndSales>
                    <Description>
                        <Label>Item price</Label>
                        <Input 
                            type="text"
                            placeholder="$0.00"
                            value={displayPrice}
                            onChange={handlePriceChange}
                        />
                    </Description>
                    <Description>
                        <Label>Enable Sale</Label>
                        <input 
                            type="checkbox" 
                            checked={(saleBool === 1) ? true : false} 
                            onChange={(e) => setSaleBool((e.target.checked) ? 1 : 0)} 
                        />
                    </Description>
                    {(saleBool === 1) && 
                        <>
                            <Description>
                                <Label>Sale Rate</Label>
                                <Input 
                                    type="number"
                                    placeholder="1.00"
                                    value={saleRate}
                                    step="0.01" // This allows increments of 0.1, which fits your decimal(2,1) requirement
                                    min="0.01" // Optional: Set a minimum value if necessary
                                    max="1.00" // Optional: Set a maximum value if necessary
                                    onChange={(e) => setSaleRate(parseFloat(e.target.value))}
                                />
                            </Description>
                            <Description>
                                <Label>Sale End Date</Label>
                                <Input 
                                    style={{width: "200px"}}
                                    type="text"
                                    placeholder="YYYY-MM-DDTHH:MM:SSZ"
                                    value={saleEnd}
                                    onChange={(e) => setSaleEnd(e.target.value)}
                                />
                            </Description>
                        </>
                    }
                </PricingAndSales>
                <Description>
                    <Label>Search or Create Tags</Label>
                    <TagSearchAndSubmit>
                        <TagSearch>
                            <TagInput
                                type="text"
                                placeholder="search tags"
                                value={tag}
                                onChange={handleTagInputChange}
                                onKeyDown={handleKeyPress}
                                onFocus={handleTagInputFocus}
                                onBlur={handleTagInputBlur}
                                ref={tagInputRef}
                            />
                            {showDropdown && (
                                <Dropdown onMouseDown={handleDropdownMouseDown}>
                                    {filteredTags.map((filteredTag, index) => (
                                        <DropdownItem key={index} onClick={() => handleTagSelection(filteredTag)} className="dropdown-item">
                                            {filteredTag}
                                        </DropdownItem>
                                    ))}
                                </Dropdown>
                            )}
                        </TagSearch>
                        <Button asset={MdOutlineNewLabel} height={'auto'} title={'Create New Tag'} onClick={handleTagAdd} />
                    </TagSearchAndSubmit>
                </Description>
                <Description>
                    <Label>Current Tags</Label>
                    <TagItems>
                        {tags.map((tag, index) => (
                                <Tag key={index}>
                                    <TagName>{tag}</TagName>
                                    <DeleteTagBtn type='button' onClick={() => handleTagDelete(tag)}><LuDelete/></DeleteTagBtn>
                                </Tag>
                            ))}
                    </TagItems>
                </Description>
                <Label>Item quantity</Label>
                <Input
                    type='number'
                    placeholder='0'
                    value={quantity}
                    onChange={handleQuantityChange}
                />
                <SubmitContainer>
                    <Submit type="submit">
                        <Button asset={isEditing ? RiSave3Fill : IoMdAdd} title={isEditing ? 'Save Changes' : 'Create Item'} onClick={() => {}} />
                    </Submit>
                </SubmitContainer>
            </Form>
        </Wrapper>
    );
}

export default ItemCreation;
