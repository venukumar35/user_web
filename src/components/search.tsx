import { Input } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { SearchNormal1 } from "iconsax-react";
import { useRef } from "react";

function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useDebouncedState("", 500);

  const handleSearch = () => {
    const inputValue = inputRef.current?.value ?? "";

    if (inputValue != value) {
      setValue(inputValue);
    }
    if (inputValue.length < 1) {
      setValue("");
    }
  };

  return (
    <div>
      <Input
        size="xs"
        radius={"md"}
        rightSectionPointerEvents="all"
        ref={inputRef}
        variant="filled"
        onChange={handleSearch}
        rightSection={
          <SearchNormal1 variant="Broken" size="20" color="#555555" />
        }
        className="focus:border-blue-500 max-sm:w-36 sm:w-40"
      ></Input>
    </div>
  );
}
export default SearchInput;
