import { useState } from "react";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";


const Wrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
`;
const Icon = styled(BsSearch)`
  position: absolute;
  color: white;
  top: 25px;
  right: 20px;
  height: 20px;
  width: 20px;
`;
const Search = styled.input`
    background-color: #2B2B2B;
    height: 60px;
    width: calc(100% - 12px);
    margin: 6px;
    border-radius: 20px;
    border: 1px solid #3B3B3B;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    padding-left: 20px;
    padding-right: 45px;
    /* Text color */
    color: white;
    /* Placeholder text style */
    /* Placeholder text style */
    &::placeholder {
      color: white;
      opacity: .6; /* Full opacity */
    }

    /* For Internet Explorer */
    &:-ms-input-placeholder {
      color: white;
      opacity: .6;
    }

    /* For Microsoft Edge */
    &::-ms-input-placeholder {
      color: white;
      opacity: .6;
    }

    /* For WebKit browsers like Chrome and Safari */
    &::-webkit-input-placeholder {
      color: white;
      opacity: .6;
    }
`;
const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    };

    const handleSearchClick = () => {
      // Perform search action here
      console.log(`Searching for: ${searchTerm}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSearchClick();
      }
    };
      
  return (
    <Wrapper>
        <Search 
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}>
        </Search>
        <Icon onClick={handleSearchClick}/>
    </Wrapper>
  )
}

export default SearchBar